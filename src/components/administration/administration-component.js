import React from 'react';
import HeaderComponent from './header-component';
import BodyComponent from './body-component';
import LotComponent from './lot-component';

const AdministrationComponent = () => {
  return (
    <>
      <header>
        <HeaderComponent></HeaderComponent>
      </header>
      <body>
        <div className='row-body'>
          <div className='left-column'>
            <LotComponent></LotComponent>
          </div>
          <div className='right-column'>
            <BodyComponent></BodyComponent>
          </div>
        </div>

      </body>
      <footer>
      </footer>

    </>
  )
}

export default AdministrationComponent;