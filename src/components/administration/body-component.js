import React, { useEffect, useState } from 'react';
import './administration.css';

const BodyComponent = () => {

    return (
        <div className='div'>
            <p className='title'>PARQUEADERO LA LIBERTAD</p>
            <form action="/form/submit" method="post">
                <div className='div'>
                    <label className='label'><b>LOTE:</b></label>
                    <input className= "input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>TIPO:</b></label>
                    <input className= "input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>PLACA:</b></label>
                    <input className= "input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>HORA ENTRADA:</b></label>
                    <input className= "input" type="text" />
                </div>
                <div className='div'>
                    <label className='label'><b>HORA SALIDA:</b></label>
                    <input className= "input" type="text" />
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