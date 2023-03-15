import React, { Component }  from 'react';
import Collapsible from 'react-collapsible';
import ReactGA from 'react-ga';
ReactGA.initialize('G-KVB5FSWBMG'); // Aqui pones tu identificador de cuenta de Google Analytics
ReactGA.pageview("Prueba");
//history.listen(location => ReactGA.pageview(location.pathname));


function Pruebas() {
    return (
      <div>
        <Collapsible trigger="Prueba Google analitys.">
          <p>Esto es una prueba de medicion para Google analitys.</p>
        </Collapsible>
      </div>
    );
}

export default Pruebas;
