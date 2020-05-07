import React, {useState} from 'react';
import Error from './Error'; 

const Formulario = ({guardarBusqueda}) => {
    
    const [termino, guardarTermino] = useState(''); 
    const [error, guardarError] = useState(false); 

    
    // accion del form 
    const buscarImgenes = (e) => { 
        e.preventDefault(); 

        // validamos
        if(termino.trim() === '') {
            guardarError(true); 
            return; 
        }; 

        guardarError(false);
        
        // le pasamos el la busqeuda
        guardarBusqueda(termino); 
        
    }


    return (  
        <form
            onSubmit={buscarImgenes}
        > 
            <div className="row">
                
                <div className="form-group col-md-8"> 
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imgaen, ejm: fut o cafe"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>
                
                <div className="form-group col-md-4"> 
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="buscar"
                    />
                </div>
                
            </div>
            { error ? <Error mensaje="Agrega un termino de busqueda " /> : null }
        </form>
    );
}
 
export default Formulario;