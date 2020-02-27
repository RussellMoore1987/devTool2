import React, { Component } from 'react';
import axios from "axios";
import {Doughnut } from 'react-chartjs-2'
import './DBDashBoard.css';

export default class DBDashBoard extends Component {
  // state
  state = {
    data:{},
    activeClassTable:0
  };

  // @ to help with chart js
  chartClickHandler = (e) => {
    // check to make sure were clicking on the right thing
    if (e[0]) {
      // reset state
      this.setState({activeClassTable: e[0]['_index']});
    }
  }

  // @ make request
  componentDidMount = () => {
    // construct the instructions for core integration context API
    const instructions_str = {
        "tables": "devTool::devTool_get_all_class_tables",
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
            console.log(response.data.content.tables.content.tables);
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
    // get active table
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

    // set fade-in animation
    setTimeout(() => {
      document.querySelector(".DBDashBoard").classList.add('page-fade-in');
    }, 800);

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
                <span className="small-text">count (8)</span>
              </div>
              <hr className="style-3"/>
            </div>
            <div className="table-column-view linking-tables">
              <div>
                <div className="data-row">
                  <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                    <span className="span-xs-5">users_to_permissions</span>
                    <span className="span-xs-3">count (27)</span>
                    <span className="span-xs-2"><span className="grayTag">SQL</span></span>
                    <div className="right-align span-xs-2 flex-end">
                      <button className="data-row-btn"><i className="far fa-list-alt"></i></button>
                      <button className="data-row-btn"><i className="far fa-edit"></i></button>
                    </div>
                  </div>
                </div>
                <div className="data-row">
                  <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                    <span className="span-xs-5">users_to_permissions</span>
                    <span className="span-xs-3">count (27)</span>
                    <span className="span-xs-2"><span className="grayTag">SQL</span></span>
                    <div className="right-align span-xs-2 flex-end">
                      <button className="data-row-btn"><i className="far fa-list-alt"></i></button>
                      <button className="data-row-btn"><i className="far fa-edit"></i></button>
                    </div>
                  </div>
                </div>
                <div className="data-row">
                  <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                    <span className="span-xs-5">users_to_permissions</span>
                    <span className="span-xs-3">count (27)</span>
                    <span className="span-xs-2"><span className="grayTag">SQL</span></span>
                    <div className="right-align span-xs-2 flex-end">
                      <button className="data-row-btn"><i className="far fa-list-alt"></i></button>
                      <button className="data-row-btn"><i className="far fa-edit"></i></button>
                    </div>
                  </div>
                </div>
                <div className="data-row">
                  <div className="ci-grid ci-grid-no-pad ci-grid-center-items">
                    <span className="span-xs-5">users_to_permissions</span>
                    <span className="span-xs-3">count (28)</span>
                    <span className="span-xs-2"><span className="grayTag">SQL</span></span>
                    <div className="right-align span-xs-2 flex-end">
                      <button className="data-row-btn" disabled><i className="far fa-list-alt"></i></button>
                      <button className="data-row-btn" disabled><i className="far fa-edit"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card span-lg-5">
            <div className="card-header">
              <h4 className="title">All Table Commands</h4>
              <hr className="style-3"/>
            </div>
            <div>
              <button className="dt-btn gray-btn small-btn">Create All</button>
              <button className="dt-btn gray-btn small-btn">Drop All</button>
              <button className="dt-btn gray-btn small-btn">Insert Records</button>
              <button className="dt-btn gray-btn small-btn">Drop/Create</button>
              <button className="dt-btn gray-btn small-btn">Drop/Create/Insert</button>
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
