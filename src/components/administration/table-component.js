import React from 'react';
import { useTable } from 'react-table'
import './administration.css'

const tableStyle = {
    border: "none",
    borderCollapse: "collapse",
  };
  
  const tdStyle = {
    border: "none",
  };

const TableComponent = ({ id, columns, data }) => (
    <table className='matchs'>
      <tbody>
        {data.map((rowData) => (
          <tr key={rowData[id]}>
            {columns.map(({ path }) => (
              <td style={tdStyle} key={path}>
                {rowData[path]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  export default TableComponent;