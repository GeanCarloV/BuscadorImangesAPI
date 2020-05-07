import React ,{useState, useEffect} from 'react';
import Formulario from './Components/Formulario'
import ListadoImagenes from './Components/Listadoimagenes'


function App() {

  // state de la api 
  const [busqueda, guardarBusqueda ] = useState(''); 
  const [imagenes, guardarImagenes ] = useState([])
  // state del paginador 
  const [paginaactual, guardarPaginaActual ] = useState(1); 
  const [totalpaginas, guardarTotalPaginas ] = useState(1)

  useEffect(() => { 
    if(busqueda === '') return; 

    const consultarApi = async () => { 
      const ImagenesPorPagina = 10; 
      const key = '16420786-f8e22664715a779d84bf431cb'; 
      // agremaos el atributo de la api en q parte estamos
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${ImagenesPorPagina}&page=${paginaactual}`;
      
      const respuesta = await fetch(url); 
      const resultado = await respuesta.json(); 

      guardarImagenes(resultado.hits);

      // calcular el total de paginas 
      // la api me indica en uno de sus parametros cuando buscaquedas disponibles hay ent otoal hits 
      // los dividimso y lo redondemso para arriva 
      const calcularTotalPaginas = Math.ceil( resultado.totalHits / ImagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas)
      

      // podemos hacer que se mueva, con slector trandicional de js 
      // seleccionamos la clase
      const jumbotron = document.querySelector('.jumbotron'); 
      // agregamos el metodo para que se vaya hacia arriba 
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    
    consultarApi()
    // le pasamos las dependencia para se vuelvan a cargar
  }, [busqueda, paginaactual])


  // funciones del paginador
  const paginaAnterior = () => { 
    // llamamos al state y verificamos que no de negativo
    const nuevaPaginaActual = paginaactual-1;

    if(nuevaPaginaActual === 0) return;
    
    guardarPaginaActual(nuevaPaginaActual); 
  }


  const paginaSiguente = () => { 
    // aumentamso en 1 pero ponemso en limete el total
    const nuevaPaginaActual = paginaactual+1;
    
    if(nuevaPaginaActual > totalpaginas) return; 

    guardarPaginaActual(nuevaPaginaActual); 
  }


  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center"> 
          <ListadoImagenes 
            imagenes={imagenes}
          />

          {/* aumentado y disminuyendo btnes */}
          {/* verificamos si esta 1 no se muestra */}
          { (paginaactual === 1) ? null : ( 
            <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior </button>
          )}     
          
          { (paginaactual === totalpaginas) ? null : (
            <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaSiguente}
            >Siguiente &raquo;</button>
          )}
        </div>
        
      </div>
    );

}


export default App;
