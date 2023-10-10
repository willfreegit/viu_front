import React, { useEffect, useState, useReducer } from 'react';
import './configuration.css'

const Lot = ({ lot, lots, updateLot }) => {
    const[style, setStyle] = useState(lot.lot_style);
    //const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const changeStyle = () => {
        if (lot.lot_clicked === "SI") {
            lot.lot_clicked = "NO";
            lot.lot_style = lot.lot_state;
            setStyle(lot.lot_state);
        } else {
            lots.map((item) => {
                item.lot_clicked = "NO";
                item.lot_style = item.lot_state;
            }
            );
            lot.lot_clicked = "SI";
            lot.lot_style = "CLICKED";
            setStyle("CLICKED");
        }
        updateLot();
        //forceUpdate();
    }

    return (
        <div className="squares">
            <div className={lot.lot_style}
                onClick={changeStyle}
            >
                <p>
                    <img src={`${process.env.PUBLIC_URL + "/figures/" + lot.lot_type + '.png'}`} width="26" height="18" /><figcaption>{lot.lot_id}</figcaption>
                    <div style={{ color: 'yellow' }}>{lot.lot_register}</div>
                </p>
            </div>
        </div>
    )
}

export default Lot;