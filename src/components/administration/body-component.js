import React, { useEffect, useState } from 'react';
import './administration.css';

const BodyComponent = ({ lot }) => {
    console.log("lot_register:");
    console.log(lot.lot_register);
    const[register, setRegister] = useState(lot.lot_register);

     const changeRegister = (e)=>{
        setRegister(e.target.value);
        lot.lot_register = e.target.value;
     }

console.log("ssssssssssssss");
console.log(lot);
    return (
        <div className='div'>
            <p className='title'>PARQUEADERO LA LIBERTAD</p>
            <form action="/form/submit" method="post">
                <div className='div'>
                    <label className='label'><b>LOTE:</b></label>
                    <input className= "input" type="text" value={lot.lot_code}/>
                </div>
                <div className='div'>
                    <label className='label'><b>TIPO:</b></label>
                    <input className= "input" type="text" value={lot.lot_type}/>
                </div>
                <div className='div'>
                    <label className='label'><b>PLACA:</b></label>
                    <input className= "input" value={lot.lot_register} onChange={changeRegister}/>
                </div>
                <div className='div'>
                    <label className='label'><b>HORA ENTRADA:</b></label>
                    <input className= "input" type="text" value={lot.lot_timeIn}/>
                </div>
                <div className='div'>
                    <label className='label'><b>HORA SALIDA:</b></label>
                    <input className= "input" type="text" value={lot.lot_timeOut}/>
                </div>
                <div className='div'>
                    <label className='label'><b>TIEMPO TOTAL:</b></label>
                    <input className= "input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>SALDO A PAGAR:</b></label>
                    <input className= "input" type="text" />
                </div>
                <button className='button'>INGRESO</button>
                <button className='button'>SALIDA</button>
            </form>
        </div>
    )
}

export default BodyComponent;