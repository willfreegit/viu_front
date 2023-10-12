import React, { useEffect, useState } from 'react';
import HeaderComponent from './header-component';
import BodyComponent from './body-component';
import LotComponent from './lot-component';
import LotJSON from './objects/lot.json';
import './administration.css'
import ResponsiveAppBar from '../responsive-app-bar';

const emptyLot = {
  lot_code: "",
  lot_id: "",
  lot_code: "",
  lot_type: "",
  lot_state: "",
  lot_clicked: "NO",
  lot_style: "",
  parking: {
      par_code: 5
  }
}

const AdministrationComponent = () => {
  const [lots, setLots] = useState([]);
  const [lot, setLot] = useState(emptyLot);
  const [dataTable, setDataTable] = useState([]);

  const updateLot = () => {
    for(var i = 0; i < lots.length; i++){
      if(lots[i].lot_clicked === "SI"){
        setLot(lots[i]);
      }
    }
  }

  //******************************UTIL COMPONENTS API *******************************/
  useEffect(() => {
    apiQuery();

}, []);

useEffect(() => {
    fullTable();
}, [lots]);

const apiQuery = () => {
    console.log("use effect se ejecuta...");
    fetch('http://127.0.0.1:8080/api/v1/lot/getByParkingId/5')
        .then(response => response.json())
        .then(json => {
            setLots(json);
        }
        )
        .catch(error => console.error(error));
}

const fullTable = () => {
    var counter = 0;
    const arrayVertical = [];
    var arrayHorizontal = [];
    setDataTable([]);
    console.log("tamano:" + lots.length);
    for (var i = 0; i < lots.length; i++) {
        if (counter == 7 || (i === (lots.length - 1))) {
            counter = 0;
            arrayVertical.push(arrayHorizontal);
            arrayHorizontal = [];
        } else {
            arrayHorizontal.push(lots[i]);
            counter++;
        }
    }
    setDataTable(arrayVertical);
}
//*********************************************************************************/

  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
      <div className="split left">
        <div className='centered'>
          <LotComponent arrayVertical={dataTable} lots={lots} updateLot={updateLot}></LotComponent>
        </div>
      </div>
      <div className="split right">
          <BodyComponent lot={lot}></BodyComponent>
      </div>
    </>
  )
}

export default AdministrationComponent;