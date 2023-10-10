import React from 'react';
import { useTable } from 'react-table'
import './configuration.css'
import Lot from './lot';

const tableStyle = {
  border: "none",
  borderCollapse: "collapse",
};

const tdStyle = {
  border: "none",
};

const TableComponent = ({ lots, data, updateLot }) => (
  <table className='matchs2'>
    <tbody>
      {data.map((rowData) => (
        <tr>
          {rowData.map((lot) => (
            <td style={tdStyle}>
              <Lot lot={lot} lots={lots} updateLot={updateLot}></Lot>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableComponent;