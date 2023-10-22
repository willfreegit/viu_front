import React, { useEffect, useState, useReducer } from 'react';
import './administration.css';
import { useAuth } from "../util/AuthContext"
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const emptyContract = {
    id_contract: "",
    state: "",
    register: "",
    time_in: null,
    time_out: null,
    time_total: 0,
    price: 0,
    total: 0,
    lot: {
        id_lot: ""
    }
}

const BodyComponent = ({ lot, lots, updateList }) => {
    const [contract, setContract] = useState(emptyContract);
    const [timeInit, setTimeInit] = useState(new Date);
    const [timeFinal, setTimeFinal] = useState(new Date);
    const [totalTime, setTotalTime] = useState(Math.round(Math.abs(timeFinal.getTime() - timeInit.getTime()) / 60));
    const [timeInitString, setTimeInitString] = useState(getDateInString(timeInit));
    const [timeFinalString, setTimeFinalString] = useState(getDateInString(timeFinal));
    const [register, setRegister] = useState(lot.contract_register);
    const [costs, setCosts] = useState([]);
    const [cost, setCost] = useState(0);
    const [pay, setPay] = useState(cost * totalTime);
    const Auth = useAuth();


    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
       // calculateValues();
        clearForm();
        contractInfo();
        contractInfo();
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
                costs.map((value) => {
                    if (value.type === lot.type) {
                        setCost(value.cost)
                    }
                }
                )
            }
            )
            .catch(error => console.error(error));
    }, [lot]);

    useEffect(() => {
        const interval = setInterval(() => {
            calculateValues();
        }, 100);
        return () => clearInterval(interval);
    }
    );

    function calculateValues() {
        setTimeInit(contract.time_in ? new Date(Date.parse(contract.time_in)) : new Date);
        setTimeFinal(new Date());
        setTotalTime(Math.round(Math.abs(timeFinal.getTime() - timeInit.getTime()) / 60000));
        setPay(roundToTwo(cost * totalTime));
        setTimeInitString(getDateInString(timeInit));
        setTimeFinalString(getDateInString(timeFinal));
    }

    function getDateInString(value) {
        return value.getHours() + ':' + (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes());
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    const changeRegister = (e) => {
        setRegister(e.target.value);
        lot.contract_register = e.target.value;
        contract.register = e.target.value;
    }

    const changeTimeIn = (e) => {
        contract.time_in = e.target.value;
    }

    const changeTimeOut = (e) => {
        contract.time_out = e.target.value;
    }

    const saveChanges = (e) => {
        if ("input" === e.target.value) {
            console.log("registro: " + register);
            lot.contract_register = register;
            contract.register = register;
            contract.time_in = timeInit;
            lots.map((item) => {
                if (item.id_lot === lot.id_lot) {
                    item.contract_register = register
                }
            }
            )
            updateList();
        }
        if ("output" === e.target.value) {
            finalContract();
        }
        forceUpdate();
        newContract();
    }

    const clearForm = () => {
        setTimeInit(new Date);
        setTimeFinal(new Date);
        setTotalTime(0);
        setTimeInitString(getDateInString(timeInit));
        setTimeFinalString(getDateInString(timeFinal));
        setRegister("");
        setCost(0);
        setPay(cost * totalTime);
    }


    const newContract = () => {
        contract.state = "VIGENTE";
        if (lot.state === "OCUPADO") {
            toast.error("El lote esta actualmente ocupado por un vehiculo no ingresar otro.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 20000
            });
        } else {
            contract.lot.id_lot = lot.id_lot
            fetch('http://127.0.0.1:8080/api/v1/contract/save', {
                method: 'POST',
                body: JSON.stringify(contract),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Auth.getToken()
                }
            }
            )
                .then(response => response.json())
                .then(json => {
                    updateList();
                    clearForm();
                }
                )
                .catch(error => console.error(error));
        }
    }

    const contractInfo = () => {
        console.log("ingresa a buscar el contrato" + lot.contract_id);
        setContract(emptyContract);
        clearForm();
        if (lot.contract_id) {
            console.log("va a llamar al ws");
            fetch('http://127.0.0.1:8080/api/v1/contract/findById/' + lot.contract_id, {
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
                    console.log(json);
                    setContract(json);
                }
                )
                .catch(error => console.error(error));
        }
    }

    useEffect(() => {
        fillContract();
        calculateValues();
    }, [contract]);

    const fillContract = () => {
        try {
            setRegister(contract.register);
            if (contract.time_in && contract.time_in != null) {
                setTimeInitString(getDateInStringFromWS(contract.time_in));
                setTimeInit(contract.time_in);
            }
        } catch (e) {

        }
    }

    function getDateInStringFromWS(value2) {
        var value = new Date(Date.parse(value2));
        return value.getHours() + ':' + (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes());
    }

    //-----------------------------------------------------------

    const finalContract = () => {
        confirmAlert({
            title: 'MARCAR SALIDA',
            message: '¿Está seguro de registrar la salida?',
            buttons: [
                {
                    label: 'SI',
                    onClick: () => updateLot()
                },
                {
                    label: 'NO',

                }
            ]
        });
    }

    const updateLot = () => {
        console.log("ya entro a finalizar....");
        contract.state = 'FINALIZADO';
        fetch('http://127.0.0.1:8080/api/v1/contract/update/' + lot.contract_id, {
            method: 'PUT',
            body: JSON.stringify(contract),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            }
        }
        )
            .then(response => response.json())
            .then(json => {
                updateList();
                clearForm();
            }
            )
            .catch(error => console.error(error));
    }


    return (
        <div className='div'>
            <div>
                <p className='title1'>PARQUEADERO LA LIBERTAD</p>
            </div>
            <br></br>
            <div className='centered'>
                <div className='div'>
                    <label className='label'><b>LOTE:</b></label>
                    <input className="input" type="text" value={lot.code} />
                </div>
                <div className='div'>
                    <label className='label'><b>TIPO:</b></label>
                    <input className="input" type="text" value={lot.type} />
                </div>
                <div className='div'>
                    <label className='label'><b>PLACA:</b></label>
                    <input className="input" value={register} onChange={changeRegister} />
                </div>
                <div className='div'>
                    <label className='label'><b>HORA ENTRADA:</b></label>
                    <input className="input" value={timeInitString} onChange={changeTimeIn} />
                </div>
                <div className='div'>
                    <label className='label'><b>HORA SALIDA:</b></label>
                    <input className="input" value={timeFinalString} onChange={changeTimeOut} />
                </div>
                <div className='div'>
                    <label className='label'><b>TIEMPO TOTAL:</b></label>
                    <input className="input" value={totalTime} />
                </div>
                <div className='div'>
                    <label className='label'><b>PRECIO MINUTO:</b></label>
                    <input className="input" value={cost} />
                </div>
                <div className='div'>
                    <label className='label'><b>SALDO A PAGAR $:</b></label>
                    <input className="input" value={pay} />
                </div>
                <button className='button' value="input" onClick={saveChanges}>INGRESO</button>
                <button className='button' value="output" onClick={saveChanges}>SALIDA</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BodyComponent;