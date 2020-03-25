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
    }
  }

  // @ make initial request
  componentDidMount = () => {
    // get data
    this.getData();
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
        // build objects
        for (let i = 0; i < command_array.length; i++) {
          command_obj[command_array[i][0]] = command_array[i][1];
        }
        console.log(command_obj);
        // put request in to form data
        const formData = new FormData();
        formData.append('instructions', JSON.stringify(command_obj));
        // make the call to the core integration context API
        axios.post('http://localhost/open_source_project/public/api/contextApi/v1/', formData)
          .then(response => {
            console.log("contextApi got it", response);
            // check for a good response
            if (response.status === 200) {
              // loop through each one and collect messages/errors
              const object = response.data.content;
              for (const property in object) {
                // check to see if it has a message
                if (typeof object[property]['content']['message'] !== 'undefined') {
                  // your code here
                  console.log(`${property}: ${object[property]['content']['message']}`);
                  console.log('fdhfkjhjdshkjhfkjhksdj:', object[property]['content']['message']);
                  // loop over every message
                  for (let i = 0; i < object[property]['content']['message'].length; i++) {
                    const notification = {};
                    notification.type = 'success';
                    notification.message = object[property]['content']['message'][i];
                    notification.duration = 1500;
                    NotificationsCreator([notification]);
                  }
                }
                // if it does not have a message it should have an error message but still check
                if (typeof object[property]['content']['errors'] !== 'undefined') {
                  console.log(`${property}: ${object[property]['content']['errors']}`);
                  // your code here
                }
                console.log(object);
              }
              this.runningSqlCommand = false;
              this.removeSpinner()
              this.getData();
              // if (obj.hasOwnProperty('foo')) {
              //   // your code here
              // }
              // check for errors
            //   if (response.data.content.tables.statusCode === 200) {
            //     // add tables to updateStateArray
            //     updateStateArray.tables = response.data.content.tables.content.tables;
            //     updateStateArray.otherTables = response.data.content.otherTables.content.tables;
            //     console.log('content', response.data.content);
            //     console.log('tables', response.data.content.tables.content.tables);
            //     console.log('otherTables', response.data.content.otherTables.content.tables);
            // //     // trigger login in main state, this makes it switch to the dashboard
            // //     setTimeout(() => {
            // //       this.context.loginHandler();
            // //     }, 3000);
            // //     // set fade-out animation
            // //     setTimeout(() => {
            // //       document.querySelector(".ll_loginContainer").classList.add('panel-fade-out');
            // //     }, 2000);
            // //   } else {
            // //     // output error messages
            // //     console.log(response.data.content.login.errors);
            // //     this.setState({
            // //       error: true,
            // //       errorMessage: response.data.content.login.errors[0],
            // //       success: false
            // //     })
            //   }
            }
            // TODO: add else ???
    
            // reset state
            // this.setState({data: updateStateArray});
          }).catch(error => { 
            console.log("contextApi error.response", error.response);
            this.runningSqlCommand = false;
            this.removeSpinner()
          });
          // set a timeout error
          setTimeout(() => {
            // check to see if SQL command is still running
            if (this.runningSqlCommand) {
              this.runningSqlCommand = false;
              this.removeSpinner()
              this.getData(); 
              console.log("Timeout error occurred, this may be an internal error occurred or the data set you are trying to create is too large. Try again, or try reducing the size of your inserts.");
            }
          }, 7000);
      } else {
        console.log("no array to day...");
        this.runningSqlCommand = false;
        this.removeSpinner()
      }
    } else {
      console.log("SQL command already running must wait until it's completed...");
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
    axios.post('http://localhost/open_source_project/public/api/contextApi/v1/', formData)
      .then(response => {
        console.log("contextApi got it", response);
        const updateStateArray = {};
        // check for a good response
        if (response.status === 200) {
          // check for errors
          if (response.data.content.tables.statusCode === 200) {
            // add tables to updateStateArray
            updateStateArray.tables = response.data.content.tables.content.tables;
            updateStateArray.otherTables = response.data.content.otherTables.content.tables;
            console.log('content', response.data.content);
            console.log('tables', response.data.content.tables.content.tables);
            console.log('otherTables', response.data.content.otherTables.content.tables);
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
      // set tables
      let activeClassTable = null; 
      if (this.state.data.tables) {
        const activeClass = this.state.data.tables[this.state.activeClassTable]
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
              <span>size({activeClass.tableSize ? activeClass.tableSize : "0MB"})</span>
            </div>
            <span>count ({activeClass.recordCount ? activeClass.recordCount : "0"}) </span>
            {activeClass.fakerData ? <span className="grayTag">fakerData</span> : ''}
            {activeClass.sqlStructure ? <span className="grayTag">sqlStructure</span> : ''}
            {activeClass.restApi ? <span className="grayTag">restApi</span> : ''}
            <p>Table Structure</p>
            <hr className="style-3"/>
            <div className="table-column-view"><div>{columnAttributes}</div></div>
          </div>  
        ;
      }

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

      // getting select options
      let selectTableOptions = <React.Fragment><option value="">No options available...</option></React.Fragment>;
      if (this.state.data.tables) { 
        selectTableOptions = getChartData.names.map((table, index) => {
          return (
            <React.Fragment key={table}>
              <option value={index}>{table}</option>
            </React.Fragment>
          )
        }) 
        ;
        
      }

      console.log("getChartData",getChartData);

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
    // @ get active table end

    // set fade-in animation
    setTimeout(() => {
      document.querySelector(".DBDashBoard").classList.add('page-fade-in');
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
        console.log('log', this.state.data.otherTables);
        // get other table layout ready  
        otherTables = otherTables_array.map((table) => {
          return (
            <div key={table.tableName} className="data-row">
               <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                <span className="span-xs-5">{table.tableName}</span>
                <span className="span-xs-3">count ({table.count})</span>
                <span className="span-xs-2">
                  {table.sql ? <span className="grayTag">SQL</span> : ''}
                </span>
                <div className="right-align span-xs-2 flex-end">
                  {/* check to see if we should display buttons, if the table is there button should appear */}
                  { table.tableThere ? 
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

    return (
      <div className="DBDashBoard">
        <div className="breadcrumb">
          <h1 className="title">Database |</h1>
          <span >Dashboard</span>
          <hr/>
        </div>
        <div className="ci-grid">
          <div className="card span-lg-7 row-span-3">
            <h4 className="title">Class Based Tables</h4>
            <div className="ci-grid">
              <div className="span-xl-6 span-lg-12 span-sm-6 donutChart">
                <Doughnut 
                  data={data} 
                  height={300}
                  width={400} 
                  options={options} 
                  onElementsClick={this.chartClickHandler.bind(this)}
                />
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
              {/* ! start here **************************************************************** */}
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
              <select className="form-control f-40" name="" id="">
                {selectTableOptions}
              </select>
            </div>
            <div>
              <button className="dt-btn gray-btn small-btn">Create</button>
              <button className="dt-btn gray-btn small-btn">Drop</button>
              <button className="dt-btn gray-btn small-btn">Insert Records</button>
              <button className="dt-btn gray-btn small-btn">Drop/Create</button>
              <button className="dt-btn gray-btn small-btn">Drop/Create/Insert</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
