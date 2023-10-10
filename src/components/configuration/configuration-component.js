import React, { useEffect, useState } from 'react';
import LotJSON from './objects/lot.json';
import TableComponent from './table-component';
import './configuration.css'

const empty = {
    lot_code: "",
    lot_type: "",
    lot_register: "",
    lot_timeIn: "",
    lot_timeOut: "",
    lot_timeTotal: "",
    lot_price: "",
    lot_state: "",
    lot_clicked: "",
    lot_style: ""
}

const ConfigurationComponent = () => {
    const [lots, setLots] = useState([]);
    const [lot, setLot] = useState(empty);
    const [selectedLotType, setSelectedLotType] = useState('AUTOMOVIL');
    const [selectedLotState, setSelectedLotState] = useState('LIBRE');
    const [selectedParkingState, setSelectedParkingState] = useState('ABIERTO');

    var arrayHorizontal = [];
    const arrayVertical = [];


    //******************************UTIL COMPONENTS API *******************************/
    useEffect(() => {
        fetch('http://127.0.0.1:8080/api/v1/lot/getByParkingId/5')
            .then(response => response.json())
            .then(json => {
                console.log('lots value:');
                console.log(json);
                setLots(json);
            }
            )
            .catch(error => console.error(error));
    }, []);
    //*********************************************************************************/

    const updateLot = () => {
        for (var i = 0; i < lots.length; i++) {
            if (lots[i].lot_clicked === "SI") {
                setLot(lots[i]);
            }
        }
    }

    var counter = 0;
    for (var i = 0; i < lots.length; i++) {
        if (counter == 7) {
            counter = 0;

            arrayVertical.push(arrayHorizontal);
            arrayHorizontal = [];
        } else {
            arrayHorizontal.push(lots[i]);
            if (i == lots.length - 1) {
                arrayVertical.push(arrayHorizontal);
                arrayHorizontal = [];
            }
        }
        counter++;
    }

    const saveChangesLot = (e) => {
        if ("save" === e.target.value) {
            
        }
        if ("delete" === e.target.value) {

        }
        if ("cancel" === e.target.value) {

        }
    }

    return (
        <div className='body3'>
            <h4 className='title2'>CONFIGURACIÓN GENERAL</h4>
            <div className='left2'>
                <div className='left3'>
                    <div className='scrollable2'>
                        <TableComponent lots={lots} data={arrayVertical} updateLot={updateLot} />
                    </div>
                </div>
                <div className='right3'>
                    <div className='div2'>
                        <label className='label2'><b>NOMBRE:</b></label>
                        <input className="input2" type="text" />
                        <br></br>
                        <label className='label2'><b>TIPO:</b></label>
                        <select className="select2" value={selectedLotType} onChange={e=> setSelectedLotType(e.target.value)}>
                            <option value="AUTOMOVIL">AUTOMOVIL</option>
                            <option value="MOTOCICLETA">MOTOCICLETA</option>
                        </select>
                        <br></br>
                        <label className='label2'><b>ESTADO:</b></label>
                        <select className="select2" value={selectedLotState} onChange={e=> setSelectedLotState(e.target.value)}>
                            <option value="LIBRE">LIBRE</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                        </select>
                        
                    </div>
                    <br></br><br></br>
                    <div className='div3'>
                        <button className='button2' value="save" onClick={saveChangesLot} >GUARDAR</button>
                    </div>
                    <div className='div3'>
                        <button className='button2' value="delete" onClick={saveChangesLot} >ELIMINAR</button>
                    </div>
                    <div className='div32'>
                        <button className='button2' value="cancel" onClick={saveChangesLot} >CANCELAR</button>
                    </div>
                </div>
            </div>
            <div className='right2'>
                <div className='div2'>
                    <label className='label3'><b>NOMBRE DEL PARQUEADERO:</b></label>
                    <input className="input3" /><br></br>
                    <label className='label3'><b>ESTADO:</b></label>
                    <select className="select2" value={selectedParkingState} onChange={e=> setSelectedParkingState(e.target.value)}>
                            <option value="ABIERTO">ABIERTO</option>
                            <option value="CERRADO">CERRADO</option>
                        </select><br></br>
                    <label className='label3'><b>DIRECCIÓN:</b></label>
                    <input className="input3" /><br></br>
                    <label className='label3'><b>LATITUD:</b></label>
                    <input className="input2" /><br></br>
                    <label className='label3'><b>LONGITUD:</b></label>
                    <input className="input2" /><br></br>
                    <label className='label3'><b>PRECIO POR MINUTO:</b></label>
                    <input className="input2" /><br></br>
                    <label className='label3'><b>HORARIO DE LUNES A VIERNES:</b></label>
                    <input className="input3" /><br></br>
                    <label className='label3'><b>HORARIO DE FINES DE SEMANA:</b></label>
                    <input className="input3" />
                    <br></br>
                    <br></br>
                    <div className='div4'>
                        <button className='button2' value="input" >GUARDAR</button>
                    </div>
                    <div className='div42'>
                        <button className='button2' value="input" >CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ConfigurationComponent;