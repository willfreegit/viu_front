import React, { useEffect, useState } from 'react';
import './administration.css';
import GetCosts from '../api-util/cost-service';

const BodyComponent = ({ lot }) => {
    console.log("lot_register:");
    console.log(lot.lot_register);
    const date = new Date();
    const [time, setTime] = useState(new Date);
    const [register, setRegister] = useState(lot.lot_register);
    const [costs, setCosts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8080/api/v1/cost/getByParkingId/5')
            .then(response => response.json())
            .then(json => setCosts(json))
            .catch(error => console.error(error));
            console.log("buscando costos...");
        console.log(costs);
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }
    );

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

    return (
        <div className='div'>
            <p className='title'>PARQUEADERO LA LIBERTAD</p>
            <form action="/form/submit" method="post">
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
                    <input className="input" value={
                        lot.lot_timeIn ? lot.lot_timeIn :
                            (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()))
                    } onChange={changeTimeIn} />
                </div>
                <div className='div'>
                    <label className='label'><b>HORA SALIDA:</b></label>
                    <input className="input" value={
                        (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()))
                    } onChange={changeTimeOut} />
                </div>
                <div className='div'>
                    <label className='label'><b>TIEMPO TOTAL:</b></label>
                    <input className="input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>PRECIO MINUTO:</b></label>
                    <input className="input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>SALDO A PAGAR:</b></label>
                    <input className="input" type="text" />
                </div>
                <button className='button'>INGRESO</button>
                <button className='button'>SALIDA</button>
            </form>
        </div>
    )
}

export default BodyComponent;