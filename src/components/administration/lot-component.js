import React, { useEffect, useState } from 'react';
import TableComponent from './table-component';
import Lot from './lot';

const LotComponent = ({ }) => {
    const columns = [
        { path: "A" },
        { path: "B" },
        { path: "C" },
        { path: "D" },
      ];
    
      const data = [
        
        {  A:  <Lot></Lot>, B:  <Lot></Lot>, C:  <Lot></Lot>, D:  <Lot></Lot> },
        {  A: <Lot></Lot>, B:  <Lot></Lot>, C:  <Lot></Lot> },
        {  A: <Lot></Lot>, B:  <Lot></Lot>, C:  <Lot></Lot>}
      ];

    return(
        <div className='scrollable'>
         <TableComponent id="id" columns={columns} data={data} />
        </div>
    )
}

export default LotComponent;