import React from 'react';
import ResponsiveAppBar from '../responsive-app-bar';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const HistoryComponent = () => {
    const data = {
        columns: [
            {
                label: 'PLACA',
                field: 'placa',
                sort: 'asc',
                width: 150
            },
            {
                label: 'LOTE',
                field: 'lote',
                sort: 'asc',
                width: 270
            },
            {
                label: 'TIPO',
                field: 'tipo',
                sort: 'asc',
                width: 200
            },
            {
                label: 'HORA ENTRADA',
                field: 'horae',
                sort: 'asc',
                width: 100
            },
            {
                label: 'HORA SALIDA',
                field: 'horas',
                sort: 'asc',
                width: 150
            },
            {
                label: 'PRECIO TOTAL',
                field: 'precio',
                sort: 'asc',
                width: 100
            }
        ],
        rows: [
            {
                placa: 'ABG8978',
                lote: 'C56',
                tipo: 'AUTOMOVIL',
                horae: 'Martes 02 de junio - 17:30',
                horas: 'Martes 02 de junio - 17:45',
                precio: '$0.30'
            },
            {
                placa: 'PCH1912',
                lote: 'A12',
                tipo: 'MOTOCICLETA',
                horae: 'Lunes 12 de agosto - 11:00',
                horas: 'Lunes 12 de agosto - 14:04',
                precio: '$3.40'
            },
            {
                placa: 'UIKS0122',
                lote: 'A01',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 14 de agosto - 09:12',
                horas: 'Miercoles 14 de agosto - 10:45',
                precio: '$1.30'
            },
            {
                placa: 'AHU1872',
                lote: 'A12',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 14 de agosto - 11:20',
                horas: 'Miercoles 14 de agosto - 23:45',
                precio: '$8.76'
            },
            {
                placa: 'ZZ3920',
                lote: 'B16',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 14 de agosto - 7:30',
                horas: 'Miercoles 14 de agosto - 17:00',
                precio: '$11.50'
            },
            {
                placa: 'ABT8978',
                lote: 'A05',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 14 de agosto - 10:01',
                horas: 'Miercoles 14 de agosto - 10:15',
                precio: '$0.20'
            },
            {
                placa: 'ABG2221',
                lote: 'D02',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 14 de agosto - 17:30',
                horas: 'Miercoles 14 de agosto - 17:45',
                precio: '$0.30'
            },
            {
                placa: 'ABG8978',
                lote: 'A56',
                tipo: 'AUTOMOVIL',
                horae: 'Miercoles 21 de agosto - 17:30',
                horas: 'Miercoles 21 de agosto - 17:45',
                precio: '$0.30'
            },
            {
                placa: 'ABG8978',
                lote: 'A56',
                tipo: 'AUTOMOVIL',
                horae: 'Jueves 22 de agosto - 17:30',
                horas: 'Jueves 22 de agosto - 17:45',
                precio: '$0.30'
            },
            {
                placa: 'ABG8978',
                lote: 'A56',
                tipo: 'AUTOMOVIL',
                horae: 'Jueves 22 de agosto - 09:40',
                horas: 'Jueves 22 de agosto - 11:45',
                precio: '$1.90'
            },
            {
                placa: 'ABG8978',
                lote: 'B16',
                tipo: 'MOTOCICLETA',
                horae: 'Viernes 23 de agosto - 17:30',
                horas: 'Viernes 23 de agosto - 17:45',
                precio: '$1.30'
            },
            {
                placa: 'ABG8978',
                lote: 'B16',
                tipo: 'AUTOMOVIL',
                horae: 'Viernes 23 de agosto - 9:30',
                horas: 'Viernes 23 de agosto - 11:45',
                precio: '$0.90'
            },
            {
                placa: 'ABG8978',
                lote: 'A12',
                tipo: 'MOTOCICLETA',
                horae: 'Viernes 23 de agosto - 09:40',
                horas: 'Viernes 23 de agosto - 16:45',
                precio: '$6.0'
            }
        ]
    };




    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <MDBDataTable
                striped
                bordered
                small
                data={data}
            />
        </>
    )
}

export default HistoryComponent;