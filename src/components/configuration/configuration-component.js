import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableComponent from './table-component';
import './configuration.css'
import ResponsiveAppBar from '../responsive-app-bar';
import { useAuth } from "../util/AuthContext"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const emptyLot = {
    code: "",
    id_lot: "",
    type: "",
    state: "",
    clicked: "NO",
    style: "",
    parking: {
        id_parking: 1
    }
}


const emptyParking = {
    id_parking: "",
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    attention: "",
    state: ""
}



const ConfigurationComponent = () => {
    const [parking, setParking] = useState(emptyParking);
    const [lots, setLots] = useState([]);
    const [lot, setLot] = useState(emptyLot);
    const [id, setId] = useState(lot.code);
    const [costs, setCosts] = useState([]);
    const [cost, setCost] = useState("0");
    const [dataTable, setDataTable] = useState([]);
    const [selectedHorType, setSelectedHorType] = useState('SEMANA');
    const [selectedLotType, setSelectedLotType] = useState('AUTOMOVIL');
    const [selectedLotTypeCost, setSelectedLotTypeCost] = useState('AUTOMOVIL');
    const [selectedLotState, setSelectedLotState] = useState('LIBRE');
    const [selectedParkingState, setSelectedParkingState] = useState('ABIERTO');


    const[inputNombre, setInputNombre] = useState();
    const[inputDireccion, setInputDireccion] = useState();
    const[inputLatitud, setInputLatitud] = useState();
    const[inputLongitud, setInputLongitud] = useState();
    const[inputHorario, setInputHorario] = useState();

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
            if(selectedLotState == 'MANTENIMIENTO'){
                lot.state = selectedLotState;
            }
            lot.type = selectedLotType;
            lot.style = selectedLotState;
            apiMaintenaince(e);
        }
        if ("delete" === e.target.value) {

        }
        if ("cancel" === e.target.value) {

        }
    }

    const handleParkingName = (e) => {
        setInputNombre(e.target.value);
        parking.name = e.target.value
    }

    const handleParkingDireccion = (e) => {
        setInputDireccion(e.target.value);
        parking.address = e.target.value
    }

    const handleParkingLatitud = (e) => {
        setInputLatitud(e.target.value);
        parking.latitude = e.target.value;
    }

    const handleParkingLongitud = (e) => {
        setInputLongitud(e.target.value);
        parking.longitude = e.target.value;

    }

    const handleParkingPrecio = () => {


    }

    const handleParkingHorarioNormal = (e) => {
        setInputHorario(e.target.value);
        parking.attention = e.target.value;
    }

    const handleParkingHorarioFin = () => {

    }

    const handleParkingAttention = () => {

    }
    //******************************UTIL COMPONENTS API *******************************/
    useEffect(() => {
        apiQuery();
        parkingInfo();
        apiCost();
    }, []);

    useEffect(() => {
        validateCost();
    }, [selectedLotTypeCost]);

    useEffect(() => {
        fullTable();
    }, [lots]);

    

    const apiMaintenaince = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8080/api/v1/lot/save', {
            method: 'POST',
            body: JSON.stringify(lot),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + Auth.getToken()
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
        fetch('http://127.0.0.1:8080/api/v1/lot/getByParkingId/1', {
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


    const apiCost = ()=>{
        fetch('http://127.0.0.1:8080/api/v1/cost/getByParkingId/1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                setCosts(json);
            }
            )
            .catch(error => console.error(error));
    }

    const parkingInfo = () => {
        fetch('http://127.0.0.1:8080/api/v1/parking/getById/1', {
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
                setParking(json);
            }
            )
            .catch(error => console.error(error));
    }

    const fullTable = () => {
        setInputNombre(parking.name);
        setInputDireccion(parking.address);
        setInputLatitud(parking.latitude);
        setInputLongitud(parking.longitude);
        setInputHorario(parking.attention);
        validateCost();

        var counter = 0;
        const arrayVertical = [];
        var arrayHorizontal = [];
        setDataTable([]);
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

    const validateCost = () =>{
        console.log(costs);
        
        for(var i = 0; i < costs.length; i++) {
            console.log(selectedLotTypeCost)
            console.log(costs[i].type)
            console.log("-----------------")
            if(selectedLotTypeCost === costs[i].type){
                console.log('xxxxxxxxxxxxxxxx')
                setCost(costs[i].cost)
            }
        }
    }

    const move01 = (e) =>{
        setSelectedLotTypeCost(e.target.value)
    }

    const modificarParking = () =>{
        confirmAlert({
            title: 'Modificar Parqueadero',
            message: '¿Está seguro de continuar?',
            buttons: [
              {
                label: 'SI',
                onClick: () => updateParking()
              },
              {
                label: 'NO',
                
              }
            ]
          });
    }

    const eliminarLote = () =>{
        confirmAlert({
            title: 'Eliminar Lote',
            message: '¿Está seguro de continuar?',
            buttons: [
              {
                label: 'SI',
                onClick: () => deleteLote()
              },
              {
                label: 'NO',
                
              }
            ]
          });
    }

    const modificarLote = () =>{
        confirmAlert({
            title: 'Modificar Lote',
            message: '¿Está seguro de continuar?',
            buttons: [
              {
                label: 'SI',
                onClick: () => updateLote()
              },
              {
                label: 'NO',
                
              }
            ]
          });
    }

    const deleteLote = () =>{
        if(lot.state === "OCUPADO"){
            toast.error("El lote esta actualmente ocupado por un vehiculo no se puede eliminar.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 20000
            });
        } else{
            fetch('http://127.0.0.1:8080/api/v1/parking/update/1', {
                method: 'PUT',
                body: JSON.stringify(parking),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Auth.getToken()
                }
            }
            )
                .then(response => response.json())
                .then(json => {
                    setParking(json);
                }
                )
                .catch(error => console.error(error));
        }
        
    }

    const updateLote = () =>{
        if(lot.state === "OCUPADO"){
            toast.error("El lote esta actualmente ocupado por un vehiculo no se puede eliminar.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 20000
            });
        } else{
            fetch('http://127.0.0.1:8080/api/v1/parking/update/1', {
            method: 'PUT',
            body: JSON.stringify(parking),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            }
        }
        )
            .then(response => response.json())
            .then(json => {
                setParking(json);
            }
            )
            .catch(error => console.error(error));
        }
        
    }

    const updateParking = () =>{
        fetch('http://127.0.0.1:8080/api/v1/parking/update/1', {
            method: 'PUT',
            body: JSON.stringify(parking),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            }
        }
        )
            .then(response => response.json())
            .then(json => {
                setParking(json);
            }
            )
            .catch(error => console.error(error));
    }

    return (
        <div className='body3'>
            <ResponsiveAppBar></ResponsiveAppBar>
            <h4 className='title22'>CONFIGURACIÓN GENERAL</h4>
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
                            <option value="LIBRE">HABILITADO</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                        </select>

                    </div>
                    <br></br><br></br>
                    <div className='div3'>
                        <button className='button2' value="add" onClick={saveChangesLot} >AGREGAR</button>
                    </div>
                    <div className='div3'>
                        <button className='button2' value="delete" onClick={eliminarLote} >ELIMINAR</button>
                    </div>
                    <div className='div32'>
                        <button className='button2' value="edit" onClick={modificarLote} >MODIFICAR</button>
                    </div>
                </div>
            </div>
            <div className='right2'>
                <div className='div2'>
                    <label className='label3'><b>NOMBRE DEL PARQUEADERO:</b></label>
                    <input className="input3" value={inputNombre} onChange={handleParkingName} /><br></br>
                    <label className='label3'><b>ESTADO:</b></label>
                    <select className="select2" value={selectedParkingState} onChange={e => setSelectedParkingState(e.target.value)}>
                        <option value="ABIERTO">ABIERTO</option>
                        <option value="CERRADO">CERRADO</option>
                    </select><br></br>
                    <label className='label3'><b>DIRECCIÓN:</b></label>
                    <input className="input3" value={inputDireccion} onChange={handleParkingDireccion} /><br></br>
                    <label className='label3'><b>LATITUD:</b></label>
                    <input className="input2" value={inputLatitud} onChange={handleParkingLatitud} /><br></br>
                    <label className='label3'><b>LONGITUD:</b></label>
                    <input className="input2" value={inputLongitud} onChange={handleParkingLongitud} /><br></br>
                    <label className='label3'><b>PRECIO POR MINUTO:</b></label>
                    <input className="input222" value={cost}/>
                    <select className="select2" value={selectedLotTypeCost} onChange={move01}>
                        <option value="AUTOMOVIL">AUTOMOVIL</option>
                        <option value="MOTOCICLETA">MOTOCICLETA</option>
                    </select>
                    <label className='label3'><b>HORARIO ATENCIÓN:</b></label>
                    <input className="input3" value={inputHorario} onChange={handleParkingAttention} /><br></br>
                    <br></br>
                    <br></br>
                    <div className='div4'>
                        <button className='button2' value="input" onClick={modificarParking}>MODIFICAR</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default ConfigurationComponent;