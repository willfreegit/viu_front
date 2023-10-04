import React from 'react';
import HeaderComponent from './header-component';
import BodyComponent from './body-component';
import LotComponent from './lot-component';

const AdministrationComponent = () => {
  return (
    <>
      <div class="split left">
        <div className='centered'>
          <LotComponent></LotComponent>
        </div>
      </div>
      <div class="split right">
        
          <BodyComponent></BodyComponent>
      

      </div>




    </>
  )
}

export default AdministrationComponent;