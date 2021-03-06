import React, { Component } from 'react';
import axios from "axios";
import {Doughnut } from 'react-chartjs-2'
import './DBDashBoard.css';
// notification creator
import { NotificationsCreator } from '../../../Notifications/Notifications';

export default class DBDashBoard extends Component {
  // state
  state = {
    data:{},
    activeClassTable:0
  };

  runningSqlCommand = false;

  // @ to help with chart js
  chartClickHandler = (e) => {
    // check to make sure were clicking on the right thing
    if (e[0]) {
      // reset state
      this.setState({activeClassTable: e[0]['_index']});
    } else if (e.target !== undefined) {
      // console.log(e.target.dataset.index);
      // reset state
      this.setState({activeClassTable: e.target.dataset.index});
    }
  }

  // @ make initial request
  componentDidMount = () => {
    // get data
    this.getData();
  }

  // @ select change handler
  selectChangeHandler = (e) => {
    // move over and change state to the class specified
    for (let i = 0; i < this.state.data.tables.length; i++) {
      const className = this.state.data.tables[i].className;
      const classIndex = i;
      if (className === e.target.value) {
        // reset state
        this.setState({activeClassTable: classIndex});
        break;
      }
    }
  }

  // @ DB commands
  dataBaseCommandHandler = (command_array, e) => {
    // NotificationsCreator([{type:'error', message:'This is just for fun to see if it works.', duration:1500}]);
    // check to see if you're already running in SQL
    if (!this.runningSqlCommand) {
      // console.log(command_array);
      // console.log(e.target.closest('.card'));
      // set spinner and block them from being able to click any more buttons
      const card = e.target.closest('.card');
      // Create spinner
      const spinner = document.createElement('div');
      const htmlData = '<div class="spinner-container"><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>';
      spinner.innerHTML = htmlData;
      // attached spinner
      card.appendChild(spinner);
      // set that we are running SQL command
      this.runningSqlCommand = true;
      // make sure getting what we think were getting, need an array
      if (Array.isArray(command_array)) {
        // check to see what commands we have come through, get them
        const command_obj = {};
        // get some variables for potential objects
        const individualTable = document.querySelector('#individualTable').value;
        let recordCount = document.querySelector('#numberOfRecords').value;
        // build objects
        console.log('**********************',individualTable)
        for (let i = 0; i < command_array.length; i++) {
          // do a check and see what type of command to create
          if (command_array[i][0] === 'createTable' || command_array[i][0] === 'dropTable') {
            // inner command name
            const innerCommandName = command_array[i][1];
            command_obj[command_array[i][0]] = {[innerCommandName]:individualTable};
          } else if (command_array[i][0] === 'insertRecords') {
            // inner command name
            const innerCommandName = command_array[i][1];
            // check to make sure we have a number
            if (isNaN(recordCount)) {
              command_obj[command_array[i][0]] = {[innerCommandName]:{className:individualTable}};
              // check to see if they tried to pass through text
              if (recordCount !== '') {
                // thrown an error if they did
                NotificationsCreator([{type:"error", message:`You tryed to pass the string "${recordCount}" into the record count field. This is not allowed, only numbers! The default number of records will be created.`}]);  
              }
            } else {
              command_obj[command_array[i][0]] = {[innerCommandName]:{className:individualTable}};
              command_obj[command_array[i][0]] = {[innerCommandName]:{className:individualTable, seederCount:recordCount}};
            }
          } else {
            command_obj[command_array[i][0]] = command_array[i][1];
          }
        }
        console.log('**********************',command_obj);
        // put request in to form data
        const formData = new FormData();
        formData.append('instructions', JSON.stringify(command_obj));
        // make the call to the core integration context API
        // CI: http://localhost/open_source_project/public/api/contextApi/v1/
        // Recipe App http://localhost/recipe_app/public/api/contextApi/v1/
        axios.post('http://localhost/recipe_app/public/api/contextApi/v1/', formData, {timeout: 10000})
          .then(response => {
            console.log("contextApi got it", response);
            // we are trying to detect if were getting back a message that is not Jason
            if (typeof response.data.statusCode === 'undefined') {
              NotificationsCreator([{type:"error", message:response.data.trim()}]);
            }
            // check for a good response
            if (response.status === 200) {
              // create an array for notifications
              const notifications_array = [];
              // loop through each one and collect messages/errors
              const object = response.data.content;
              for (const property in object) {
                // check to see if it has a message
                if (typeof object[property]['content'] !== 'undefined' && typeof object[property]['content']['message'] !== 'undefined') {
                  // loop over every message
                  for (let i = 0; i < object[property]['content']['message'].length; i++) {
                    const notification = {};
                    notification.type = 'success';
                    notification.message = object[property]['content']['message'][i];
                    notifications_array.push(notification);
                  }
                }
                // if it does not have a message it should have an error message but still check
                if (typeof object[property]['errors'] !== 'undefined') {
                  // console.log(`${property}: ${object[property]['errors']}`);
                  // loop over every message
                  for (let i = 0; i < object[property]['errors'].length; i++) {
                    const notification = {};
                    notification.type = 'error';
                    notification.message = object[property]['errors'][i];
                    notifications_array.push(notification);
                  }
                }
              }
              // submit all messages to notification creator
              NotificationsCreator(notifications_array);

              this.runningSqlCommand = false;
              this.removeSpinner()
              this.getData();
            }
          }).catch((error) => { 
            // console.log("contextApi error.response", error.response);
            // console.log("contextApi error", error);
            // report error if we can find it
            const errorString = String(error);
            if (errorString.includes("Error: timeout")) {
              NotificationsCreator([{type:"error", message:errorString}]);
              // check to see if SQL command is still running
              if (this.runningSqlCommand) {
                this.runningSqlCommand = false;
                this.removeSpinner()
                this.getData(); 
                NotificationsCreator([{type:"error", message:"Timeout error occurred (10000ms), This may be an internal error or the data set you are trying to create is too large. Try it again, 2 or 3 times! If that doesn't work try reducing the size of your inserts, or running the command separately to see which one is having a problem. Also note that Postman is a great tool if you are having lots of struggles here."}]);
              } else {
                NotificationsCreator([{type:"error", message:errorString}]);
              }
            }
            this.runningSqlCommand = false;
            this.removeSpinner()
          });
      } else {
        // should only be a developer error
        console.log("no array to day...");
        this.runningSqlCommand = false;
        this.removeSpinner()
      }
    } else {
      console.log("SQL command already running must wait until it's completed...");
      NotificationsCreator([{type:"error", message:"SQL command already running must wait until it's completed..."}]);
    }
  }

  // @ remove spinner
  removeSpinner = () => {
    // check to see if spinner is there
    const spinner = document.querySelector('.spinner-container');
    if (spinner) {
      spinner.remove();
    }
  }

  // @ get data
  getData = () => {
    // construct the instructions for core integration context API
    const instructions_str = {
      "tables": "devTool::devTool_get_all_class_tables",
      "otherTables": "devTool::devTool_get_all_non_class_tables"
    };
    // put request in to form data
    const formData = new FormData();
    formData.append('instructions', JSON.stringify(instructions_str));
    // make the call to the core integration context API
    // TODO: possibly make this a variable so I can utilize systems from one DevTool
    // CI: http://localhost/open_source_project/public/api/contextApi/v1/
    // Recipe App http://localhost/recipe_app/public/api/contextApi/v1/
    axios.post('http://localhost/recipe_app/public/api/contextApi/v1/', formData)
      .then(response => {
        // console.log("contextApi got it", response);
        const updateStateArray = {};
        // check for a good response
        if (response.status === 200) {
          // check for errors
          if (response.data.content.tables.statusCode === 200) {
            // add tables to updateStateArray
            updateStateArray.tables = response.data.content.tables.content.tables;
            updateStateArray.otherTables = response.data.content.otherTables.content.tables;
            // console.log('content', response.data.content);
            // console.log('tables', response.data.content.tables.content.tables);
            // console.log('otherTables', response.data.content.otherTables.content.tables);
        //     // trigger login in main state, this makes it switch to the dashboard
        //     setTimeout(() => {
        //       this.context.loginHandler();
        //     }, 3000);
        //     // set fade-out animation
        //     setTimeout(() => {
        //       document.querySelector(".ll_loginContainer").classList.add('panel-fade-out');
        //     }, 2000);
        //   } else {
        //     // output error messages
        //     console.log(response.data.content.login.errors);
        //     this.setState({
        //       error: true,
        //       errorMessage: response.data.content.login.errors[0],
        //       success: false
        //     })
          }
        }
        // TODO: add else ???

        // reset state
        this.setState({data: updateStateArray});
      }).catch(error => { 
        console.log("contextApi error.response", error.response);
      });
  }

  render() {
    // @ get active table start
      // # active table start
        // set tables
        let activeClassTable = null; 
        // set default variable
        let activeClass = {
          "seeder": false,
          "sqlStructure": false,
          "className": "",
        };
        if (this.state.data.tables) {
          activeClass = this.state.data.tables[this.state.activeClassTable]
          // get columns for activeClassTable
          const columnAttributes = activeClass.tableStructure.map((column) => {
            return (
              <div key={column.Field} className="data-row">
                <div className="tableColumnGrid">
                  <span>{column.Field}</span>
                  <span>
                    {column.Type ? `${column.Type}` : ""}
                    {column.Key ? `, ${column.Key}` : ""} 
                    {column.Extra ? `, ${column.Extra}` : ""} 
                    {column.Default ? `, Default: '${column.Default}'` : ""} 
                  </span>
                </div>
              </div>
            ) 
          })
          activeClassTable =
            <div className="" key={activeClass.tableName}>
              <div className="flex-sb">
                <h2 className="title">{activeClass.tableName}</h2>
                <span className="size-counter">size({activeClass.tableSize ? activeClass.tableSize : "0MB"})</span>
              </div>
              <div className="record-count">count ({activeClass.recordCount ? activeClass.recordCount : "0"}) </div>
              <div className="feature-list">
                {activeClass.seeder ? <span className="grayTag">seeder</span> : ''}
                {activeClass.contextApi ? <span className="grayTag">contextApi</span> : ''}
                {activeClass.sqlStructure ? <span className="grayTag">sqlStructure</span> : ''}
                {activeClass.restApi ? <span className="grayTag">restApi</span> : ''}
              </div>
              <p>Table Structure</p>
              <hr className="style-3"/>
              <div className="table-column-view"><div>{columnAttributes}</div></div>
            </div>  
          ;
        }
      // # active table end

      // # select options start
        // getting select options
        let selectTableOptions = <React.Fragment><option value="">No options available...</option></React.Fragment>;
        if (this.state.data.tables) { 
          selectTableOptions = this.state.data.tables.map((table) => {
            return (
              <React.Fragment key={table.tableName}>
                  <option value={table.className}>
                    {table.tableName}
                  </option>
              </React.Fragment>
            )
          }) 
          ;
        }
      // # select options end

      // # chart info start
        // get data for donut chart, set defaults
        let getChartData = {
          counts: [],
          names: [],
          backgroundColors: [],
          borderColor: []
        };
        const colors = {
          backgroundColors: [
            'rgba(228, 86, 65, .3)',
            'rgba(238, 136, 63, .3)',
            'rgba(222, 187, 155, .3)',
            'rgba(222, 220, 155, .3)',
            'rgba(228, 168, 65, .3)'
          ],
          borderColor: [
            '#E45641',
            '#EE883F',
            '#DEBB9B',
            '#DEDC9B',
            '#E4A841'
          ]
        }

        // check to see if we have data
        if (this.state.data.tables) {
          let counter = 0;
          for (let i = 0; i < this.state.data.tables.length; i++) {
            getChartData.counts.push(this.state.data.tables[i].recordCount);
            getChartData.names.push(this.state.data.tables[i].tableName);
            if (counter >= colors.backgroundColors.length) {
              counter = 0;  
            }
            getChartData.backgroundColors.push(colors.backgroundColors[counter]);
            getChartData.borderColor.push(colors.borderColor[counter]);
            counter++;
          }
        }

        // console.log("getChartData",getChartData);

        const data = {
          datasets: [{
            data: getChartData.counts ? getChartData.counts : [],
            backgroundColor: getChartData.backgroundColors ? getChartData.backgroundColors : [],
            borderColor: getChartData.borderColor ? getChartData.borderColor : [],
            label: 'Class Baced Tables' // for legend
          }],
          labels: getChartData.names ? getChartData.names : []
        };

        const options = {
          legend:{
            display: true,
            labels: {
              usePointStyle: true,
            }
          },
          maintainAspectRatio: true,
        }

        // appendage information to chart data 
        // make immutable copy of array
        const AppendageArray = [];
        const getChartDataAppendage = {...getChartData};
        for (let i = 0; i < getChartDataAppendage.counts.length; i++) {
          const AppendageCount = getChartDataAppendage.counts[i];
          const AppendageName = getChartDataAppendage.names[i];
          const AppendageBackgroundColor = getChartDataAppendage.backgroundColors[i];
          const AppendageBorderColor = getChartDataAppendage.borderColor[i];
          AppendageArray.push({
            index:i,
            count:AppendageCount,
            name:AppendageName,
            backgroundColor:AppendageBackgroundColor,
            borderColor:AppendageBorderColor,
          });
        }
        // get appendage jsx
        const appendageInfo = AppendageArray.map((info) => {
          return (
            <span 
            key={info.index} 
            data-index={info.index} 
            style={{borderColor: info.borderColor}} 
            className="appendage-info"
            onClick={this.chartClickHandler.bind(this)}>
              {`${info.name} (${info.count})`}
            </span>
          ) 
        })
      // # chart info end
    // @ get active table end

    // set page fade-in animation
    setTimeout(() => {
      // check to see if there is a dashboard
      const dashBoard = document.querySelector(".DBDashBoard");
      if (dashBoard !== null) {
        dashBoard.classList.add('page-fade-in');
      }
    }, 800);

    // @ get connecting tables start
      // set other tables
      let otherTables = null; 
      let otherTableCount = 0; 
      if (this.state.data.otherTables) {
        // get data
        const otherTables_array = this.state.data.otherTables;
        // get count
        otherTableCount = otherTables_array.length;
        // console.log('log', this.state.data.otherTables);
        // get other table layout ready  
        otherTables = otherTables_array.map((table) => {
          // check to see how long the table name this
          let tableName;
          if (table.tableName.length >= 19) {
            tableName = (
              <span data-tooltip={table.tableName}>
                {table.tableName.slice(0, 17) + '...'}
              </span>
            )
          } else {
              tableName = (
                <span className="span-xs-5">
                  {table.tableName}
                </span>
              )
          }
          return (
            <div key={table.tableName} className="data-row">
               <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                 <span className="span-xs-5">
                  {tableName}
                 </span>
                <span className="span-xs-3">count ({table.count})</span>
                <span className="span-xs-2">
                  {table.sql ? <span className="grayTag">SQL</span> : ''}
                </span>
                <div className="right-align span-xs-2 flex-end">
                  {/* check to see if we should display buttons, if the table is there button should appear */}
                  { table.tableExists ? 
                      <React.Fragment>
                        <button className="data-row-btn"><i className="far fa-list-alt"></i></button>
                        <button className="data-row-btn"><i className="far fa-edit"></i></button>
                      </React.Fragment>
                    : ''
                  }
                </div>
              </div> 
            </div>
          ) 
        });
      }
    // @ get connecting tables end

    // @ selecting which buttons to disable
      // check criteria and then switch it accordingly ex: !(true) = false, so you can use the button
      const dropBtn = !(activeClass.sqlStructure && activeClass.tableExists);
      const createBtn = !(activeClass.sqlStructure && !activeClass.tableExists);
      const insertBtn = !(activeClass.seeder && activeClass.tableExists);
      const dropCreateBtn = !activeClass.sqlStructure;
      const dropCreateInsertBtn = !(activeClass.sqlStructure && activeClass.seeder);
    // @ selecting which buttons to disable

    return (
      <div className="DBDashBoard">
        <div className="breadcrumb">
          <h1 className="title">Database |</h1>
          <span >Dashboard</span>
          <hr/>
        </div>
        <div className="ci-grid">
          <div className="card span-lg-7 row-span-3">
            <div className="flex-sb">
              <h4 className="title">Class Based Tables</h4>
              <span className="small-text">count ({(this.state.data.tables && this.state.data.tables.length) || 0})</span>
            </div>
            <div className="ci-grid">
              <div className="span-xl-6 span-lg-12 span-sm-6 donutChart">
                <Doughnut 
                  data={data} 
                  height={300}
                  width={400} 
                  options={options} 
                  onElementsClick={this.chartClickHandler.bind(this)}
                />
                <div className="span-xl-12 appendage-info-container">
                  {appendageInfo}
                </div>
              </div>
              <div className="span-xl-6 span-lg-12 span-sm-6 chartDetails">
                {activeClassTable}
              </div> 
            </div>
          </div>
          <div className="card span-lg-5">
            <div className="card-header">
              <div className="flex-sb">
                <h4 className="title">Linking Tables and Other Tables</h4>
                <span className="small-text">count ({otherTableCount})</span>
              </div>
              <hr className="style-3"/>
            </div>
            <div className="table-column-view linking-tables">
              <div>
                {otherTables}
              </div>
            </div>
          </div>
          <div className="card span-lg-5">
            <div className="card-header">
              <h4 className="title">All Table Commands</h4>
              <hr className="style-3"/>
            </div>
            <div>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['createAllTables','devTool::devTool_create_all_tables']])}>
                  Create All
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropAllTables','devTool::devTool_drop_all_tables']])}>
                  Drop All
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['insertRecordsAll','devTool::devTool_insert_records_all']])}>
                  Insert Records
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropAllTables','devTool::devTool_drop_all_tables'],['createAllTables','devTool::devTool_create_all_tables']])}>
                  Drop/Create
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropAllTables','devTool::devTool_drop_all_tables'],['createAllTables','devTool::devTool_create_all_tables'],['insertRecordsAll','devTool::devTool_insert_records_all']])}>
                  Drop/Create/Insert
              </button>
            </div>
          </div>
          <div className="card span-lg-5">
            <div className="card-header">
              <h4 className="title">Individual Table Commands</h4>
              <hr className="style-3"/>
            </div>
            <div>
              <select 
                value={activeClass.className} 
                className="form-control f-40" 
                id="individualTable"
                onChange={this.selectChangeHandler}>
                  {selectTableOptions}
              </select>
              <input className="form-control f-40" id="numberOfRecords" type="text" placeholder={"# of records, default " + activeClass.defaultCount}/>
            </div>
            <div>
              <button
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['createTable','devTool::devTool_create_class_table']])}
                disabled={createBtn}>
                  Create
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropTable','devTool::devTool_drop_class_table']])}
                disabled={dropBtn}>
                  Drop 
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['insertRecords','devTool::devTool_insert_seeder_data']])}
                disabled={insertBtn}>
                  Insert Records 
              </button>
              <button 
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropTable','devTool::devTool_drop_class_table'],['createTable','devTool::devTool_create_class_table']])}
                disabled={dropCreateBtn}>
                  Drop/Create
              </button>
              <button
                className="dt-btn gray-btn small-btn"
                onClick={this.dataBaseCommandHandler.bind(this, [['dropTable','devTool::devTool_drop_class_table'],['createTable','devTool::devTool_create_class_table'],['insertRecords','devTool::devTool_insert_seeder_data']])}
                disabled={dropCreateInsertBtn}>
                  Drop/Create/Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
