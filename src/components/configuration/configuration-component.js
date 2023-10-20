import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from './table-component';
import './configuration.css'
import ResponsiveAppBar from '../responsive-app-bar';
import { useAuth } from "../util/AuthContext"

const emptyLot = {
    code: "",
    id_lot: "",
    type: "",
    state: "",
    clicked: "NO",
    style: "",
    parking: {
        id_parking: 5
    }
}

const test = [
    {
        code: "A1",
        register: "",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A2",
        register: "",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A3",
        register: "",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A4",
        register: "",
        id_lot: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A5",
        register: "",
        id_lot: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A6",
        id_lot: "",
        register: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A7",
        id_lot: "",
        register: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A8",
        id_lot: "",
        register: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
]

const ConfigurationComponent = () => {
    const [lots, setLots] = useState(test);
    const [lot, setLot] = useState(emptyLot);
    const [id, setId] = useState(lot.code);
    const [dataTable, setDataTable] = useState([]);
    const [selectedLotType, setSelectedLotType] = useState('AUTOMOVIL');
    const [selectedLotState, setSelectedLotState] = useState('LIBRE');
    const [selectedParkingState, setSelectedParkingState] = useState('ABIERTO');
    const Auth = useAuth();

    const updateLot = () => {
        setLot(emptyLot);
        for (var i = 0; i < lots.length; i++) {
            if (lots[i].clicked === "SI") {
                setLot(lots[i]);
                setId(lots[i].code);
            }
        }
    }

    const onChangeLotName = (e) => {
        setId(e.target.value);
        lot.code = e.target.value;
    }

    const saveChangesLot = (e) => {
        if ("add" === e.target.value) {
            for (var i = 0; i < lots.length; i++) {
                if (lots[i].code === id) {
                    toast.error("No puede agregar dos lotes con el mismo nombre", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 20000
                    });
                    return;
                }
            }
            lot.state = selectedLotState;
            lot.type = selectedLotType;
            lot.style = selectedLotState;
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
                'Authorization': 'Bearer' + Auth.getToken()
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
        fetch('http://127.0.0.1:8080/api/v1/lot/getByParkingId/5', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            }
        }

        )
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
                        <input className="input2" value={lot.code} onChange={onChangeLotName} />
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