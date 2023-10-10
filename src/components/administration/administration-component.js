import React, { useEffect, useState } from 'react';
import HeaderComponent from './header-component';
import BodyComponent from './body-component';
import LotComponent from './lot-component';
import LotJSON from './objects/lot.json';
import './administration.css'

const empty = {
  lot_code:"", 
  lot_type:"", 
  lot_register:"", 
  lot_timeIn: "", 
  lot_timeOut:"", 
  lot_timeTotal:"", 
  lot_price:"", 
  lot_state:"", 
  lot_clicked: "", 
  lot_style: ""
}

const AdministrationComponent = () => {
  const [lots, setLots] = useState(LotJSON);
  const [lot, setLot] = useState(empty);

  const updateLot = () => {
    for(var i = 0; i < lots.length; i++){
      if(lots[i].lot_clicked === "SI"){
        setLot(lots[i]);
      }
    }
  }

  var arrayHorizontal = [];
  const arrayVertical = [];

  var counter = 0;
  for(var i = 0; i < lots.length; i++){
    if(counter == 7){
      counter = 0;
      arrayVertical.push(arrayHorizontal);
      arrayHorizontal = [];
    } else {
      arrayHorizontal.push(lots[i]);
      if(i == lots.length -1){
        arrayVertical.push(arrayHorizontal); 
        arrayHorizontal = [];
      }
    }
    counter ++;
  }

  return (
    <>
      <div className="split left">
        <div className='centered'>
          <LotComponent arrayVertical={arrayVertical} lots={lots} updateLot={updateLot}></LotComponent>
        </div>
      </div>
      <div className="split right">
          <BodyComponent lot={lot}></BodyComponent>
      </div>
    </>
  )
}

export default AdministrationComponent;