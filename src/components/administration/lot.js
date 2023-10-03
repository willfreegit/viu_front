import React, { useEffect, useState } from 'react';
import TableComponent from './table-component';
import './administration.css'

const Lot = ({ }) => {
    return (
        <div className="squares">
            <div className="icon1">
                <p>
                    <img src={`${process.env.PUBLIC_URL + "/figures/" + 'car' + '.png'}`} width="25" height="15"/><figcaption>A1</figcaption>
                    <div style={{color:'yellow'}}>ABH7916</div>
                    </p>
            </div>
        </div>
    )
}

export default Lot;