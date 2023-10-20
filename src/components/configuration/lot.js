import React, { useEffect, useState, useReducer } from 'react';
import './configuration.css'

const Lot = ({ lot, lots, updateLot }) => {
    const[style, setStyle] = useState(lot.style);
    //const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const changeStyle = () => {
        if (lot.clicked === "SI") {
            lot.clicked = "NO";
            lot.style = lot.state;
            setStyle(lot.state);
        } else {
            lots.map((item) => {
                item.clicked = "NO";
                item.style = item.state;
            }
            );
            lot.clicked = "SI";
            lot.style = "CLICKED";
            setStyle("CLICKED");
        }
        updateLot();
        //forceUpdate();
    }

    return (
        <div className="squares">
            <div className={lot.style}
                onClick={changeStyle}
            >
                <div>
                    <img src={`${process.env.PUBLIC_URL + "/figures/" + lot.type + '.png'}`} width="26" height="18" /><figcaption>{lot.code}</figcaption>
                    <div style={{ color: 'yellow' }}>{lot.register}</div>
                </div>
            </div>
        </div>
    )
}

export default Lot;