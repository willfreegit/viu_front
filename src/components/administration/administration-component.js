import React, { useEffect, useState } from 'react';
import HeaderComponent from './header-component';
import BodyComponent from './body-component';
import LotComponent from './lot-component';
import './administration.css'
import ResponsiveAppBar from '../responsive-app-bar';
import { useAuth } from "../util/AuthContext"

const emptyLot = {
    id_lot: "",
    code: "",
    type: "",
    state: "",
    clicked: "NO",
    style: "",
    parking: {
        id_parking: 5
    }
}

const test = [
    {
        code: "A1",
        register: "PNS019",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A2",
        register: "ABJ9099",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A3",
        register: "ABH0011",
        id_lot: "",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A4",
        register: "UBX1002",
        id_lot: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A5",
        register: "RSN102",
        id_lot: "",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A6",
        id_lot: "",
        register: "PNS233",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A7",
        id_lot: "",
        register: "1NS01A",
        type: "MOTOCICLETA",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
    {
        code: "A8",
        id_lot: "",
        register: "ABH1819",
        type: "AUTOMOVIL",
        state: "LIBRE",
        clicked: "NO",
        style: "LIBRE",
        parking: {
            id_parking: 5
        }
    },
]

const AdministrationComponent = () => {
    const [lots, setLots] = useState(test);
    const [lot, setLot] = useState(emptyLot);
    const [dataTable, setDataTable] = useState([]);
    const Auth = useAuth();

    const updateLot = () => {
        for (var i = 0; i < lots.length; i++) {
            if (lots[i].clicked === "SI") {
                setLot(lots[i]);
            }
        }
    }

    //******************************UTIL COMPONENTS API *******************************/
    useEffect(() => {
        apiQuery();
    }, []);

    useEffect(() => {
        fullTable();
    }, [lots]);

    const apiQuery = () => {
        fetch('http://127.0.0.1:8080/api/v1/lot/getByParkingId/5', {
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
            .catch(error => console.error('------>' +error));
    }

    const fullTable = () => {
        var counter = 0;
        const arrayVertical = [];
        var arrayHorizontal = [];
        setDataTable([]);
        for (var i = 0; i < lots.length; i++) {
            if (counter == 7 || (i === (lots.length - 1))) {
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

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <div className="split left">
                <div className='centered'>
                    <LotComponent arrayVertical={dataTable} lots={lots} updateLot={updateLot}></LotComponent>
                </div>
            </div>
            <div className="split right">
                <BodyComponent lot={lot}></BodyComponent>
            </div>
        </>
    )
}

export default AdministrationComponent;