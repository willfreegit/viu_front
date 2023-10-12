import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from './table-component';
import './configuration.css'
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

const ConfigurationComponent = () => {
    const [lots, setLots] = useState([]);
    const [lot, setLot] = useState(emptyLot);
    const [id, setId] = useState(lot.lot_id);
    const [dataTable, setDataTable] = useState([]);
    const [selectedLotType, setSelectedLotType] = useState('AUTOMOVIL');
    const [selectedLotState, setSelectedLotState] = useState('LIBRE');
    const [selectedParkingState, setSelectedParkingState] = useState('ABIERTO');

    const updateLot = () => {
        setLot(emptyLot);
        for (var i = 0; i < lots.length; i++) {
            if (lots[i].lot_clicked === "SI") {
                setLot(lots[i]);
                setId(lots[i].lot_id);
            }
        }
    }

    const onChangeLotName = (e) => {
        setId(e.target.value);
        lot.lot_id = e.target.value;
    }

    const saveChangesLot = (e) => {
        if ("add" === e.target.value) {
            for (var i = 0; i < lots.length; i++) {
                if (lots[i].lot_id === id) {
                    toast.error("No puede agregar dos lotes con el mismo nombre", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 20000
                    });
                    return;
                }
            }
            lot.lot_state = selectedLotState;
            lot.lot_type = selectedLotType;
            lot.lot_style = selectedLotState;
            apiMaintenaince(e);
        }
        if ("delete" === e.target.value) {

        }
        if ("cancel" === e.target.value) {

        }
    }

    //******************************UTIL COMPONENTS API *******************************/
    useEffect(() => {
        apiQuery();

    }, []);

    useEffect(() => {
        fullTable();
    }, [lots]);

    const apiMaintenaince = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8080/api/v1/lot/save', {
            method: 'POST',
            body: JSON.stringify(lot),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                console.log('correcto');
                apiQuery();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

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
            if (counter == 4 || (i === (lots.length - 1))) {
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
        <div className='body3'>
            <ResponsiveAppBar></ResponsiveAppBar>
            <h4 className='title2'>CONFIGURACIÓN GENERAL</h4>
            <div className='left2'>
                <div className='left3'>
                    <div className='scrollable2'>
                        <TableComponent lots={lots} data={dataTable} updateLot={updateLot} />
                    </div>
                </div>
                <div className='right3'>
                    <div className='div2'>
                        <label className='label2'><b>NOMBRE:</b></label>
                        <input className="input2" value={lot.lot_id} onChange={onChangeLotName} />
                        <br></br>
                        <label className='label2'><b>TIPO:</b></label>
                        <select className="select2" value={selectedLotType} onChange={e => setSelectedLotType(e.target.value)}>
                            <option value="AUTOMOVIL">AUTOMOVIL</option>
                            <option value="MOTOCICLETA">MOTOCICLETA</option>
                        </select>
                        <br></br>
                        <label className='label2'><b>ESTADO:</b></label>
                        <select className="select2" value={selectedLotState} onChange={e => setSelectedLotState(e.target.value)}>
                            <option value="LIBRE">LIBRE</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                        </select>

                    </div>
                    <br></br><br></br>
                    <div className='div3'>
                        <button className='button2' value="add" onClick={saveChangesLot} >AGREGAR</button>
                    </div>
                    <div className='div3'>
                        <button className='button2' value="delete" onClick={saveChangesLot} >ELIMINAR</button>
                    </div>
                    <div className='div32'>
                        <button className='button2' value="edit" onClick={saveChangesLot} >MODIFICAR</button>
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
                    <select className="select2" value={selectedParkingState} onChange={e => setSelectedParkingState(e.target.value)}>
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
            <ToastContainer />
        </div>

    )
}

export default ConfigurationComponent;