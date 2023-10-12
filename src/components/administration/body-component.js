import React, { useEffect, useState } from 'react';
import './administration.css';

const BodyComponent = ({ lot }) => {
    console.log("lot =================>");
    console.log(lot);
    const [timeInit, setTimeInit] = useState(lot.lot_timeIn ? lot.lot_timeIn : new Date);
    const [timeFinal, setTimeFinal] = useState(new Date);
    const [totalTime, setTotalTime] = useState(Math.round(Math.abs(timeFinal.getTime() - timeInit.getTime()) / 60));
    const [timeInitString, setTimeInitString] = useState(getDateInString(timeInit));
    const [timeFinalString, setTimeFinalString] = useState(getDateInString(timeFinal));
    const [register, setRegister] = useState(lot.lot_register);
    const [costs, setCosts] = useState([]);
    const [cost, setCost] = useState(0);
    const [pay, setPay] = useState(cost * totalTime);

    useEffect(() => {
        calculateValues();
        fetch('http://127.0.0.1:8080/api/v1/cost/getByParkingId/5')
            .then(response => response.json())
            .then(json => {
                setCosts(json);
                costs.map((value) => {
                    if (value.tar_type === lot.lot_type) {
                        setCost(value.tar_cost)
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
        }, 10000);
        return () => clearInterval(interval);
    }
    );

    function calculateValues() {
        setTimeInit(lot.lot_timeIn ? lot.lot_timeIn : new Date);
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
        lot.lot_register = e.target.value;
    }

    const changeTimeIn = (e) => {
        lot.lot_timeIn = e.target.value;
    }

    const changeTimeOut = (e) => {
        lot.lot_timeOut = e.target.value;
    }

    const saveChanges = (e) => {
        if ("input" === e.target.value) {
            lot.lot_register = register;
            lot.lot_timeIn = timeInit;
        }
        if ("output" === e.target.value) {

        }
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
                    <input className="input" type="text" value={lot.lot_id} />
                </div>
                <div className='div'>
                    <label className='label'><b>TIPO:</b></label>
                    <input className="input" type="text" value={lot.lot_type} />
                </div>
                <div className='div'>
                    <label className='label'><b>PLACA:</b></label>
                    <input className="input" value={lot.lot_register} onChange={changeRegister} />
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
        </div>
    )
}

export default BodyComponent;