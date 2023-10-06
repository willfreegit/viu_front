import React, { useEffect, useState } from 'react';
import TableComponent from './table-component';
import './administration.css'

const Lot = ({ }) => {
    const [style, setStyle] = useState("icon1");

    const changeStyle = () =>{
        console.log('hola click');
        setStyle("icon2");
    }

    return (
        <div className="squares">
            <div className={style} 
               onClick={changeStyle}
            >
                <p>
                    <img src={`${process.env.PUBLIC_URL + "/figures/" + 'car' + '.png'}`} width="25" height="15" /><figcaption>A1</figcaption>
                    <div style={{ color: 'yellow' }}>ABH7916</div>
                </p>
            </div>
        </div>
    )
}

export default Lot;