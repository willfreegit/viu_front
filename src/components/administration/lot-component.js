import React, { useEffect, useState } from 'react';
import TableComponent from './table-component';
import Lot from './lot';

const LotComponent = ({ arrayVertical, lots, updateLot }) => {

  const columns = [
    { path: "0" },
    { path: "1" },
    { path: "2" },
    { path: "3" },
    { path: "4" },
    { path: "5" },
    { path: "6" },
  ];

  const data = [

     <Lot></Lot> , <Lot></Lot>, <Lot></Lot>  
    /*{ A: <Lot></Lot>, B: <Lot></Lot>, C: <Lot></Lot> },
    { A: <Lot></Lot>, B: <Lot></Lot>, C: <Lot></Lot> }*/
  ];

  //***************************************/
  function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    if (document.getElementById("clock") != null) {
      document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
      //variables
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];
      var days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
      var curWeekDay = days[today.getDay()];
      var curDay = today.getDate();
      var curMonth = months[today.getMonth()];
      var curYear = today.getFullYear();
      var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
      document.getElementById("date").innerHTML = date;
    }
    var time = setTimeout(function () { startTime() }, 500);
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  startTime();
  //***************************************/
  return (
    <>
    <br></br>
    <br></br>
      <div id="clockdate">
        <div className="clockdate-wrapper">
          <div id="clock"></div>
          <div id="date"></div>
        </div>
      </div>

      <div className='scrollable'>
        <TableComponent lots={lots} data={arrayVertical} updateLot={updateLot}/>
      </div>
    </>
  )
}

export default LotComponent;