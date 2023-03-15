import React from 'react';
import Colapsable from '../components/Colapsable';
import Ejemplo from '../components/Hooks';
import Consumir from '../components/Consumir'
import Prueba from './Prueba'

function Home() {
    return (
      <div>
        <Colapsable />
        <Ejemplo />
        <Consumir />
        <Prueba />
      </div>
    );
}

export default Home;
