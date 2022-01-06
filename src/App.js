import {Fragment, useState, useEffect} from 'react'
import Buscador from './components/Buscador'
import Letra from './components/Letra'
import Info from './components/Info'
import axios from 'axios'

function App() {

  //State
  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('')
  const [info, setInfo] = useState({})
  const [error, setError] = useState(false)
  const {artista, cancion} = busquedaLetra

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0){
      return
    }

    const requestAPILetra = async () =>{
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`
      const [letra, informacion] = await Promise.all([
        axios.get(url).then( response => {
          setError(false)
          return response
        }).catch( (error) => setError(true) ),
        axios.get(url2).then( response => {
          setError(false)
          return response
        } ).catch( (error) => setError(true) )
      ])

      if(!error){
        let lyrics = letra.data.lyrics
        setInfo(informacion.data.artists[0])
        setLetra(lyrics)
      }

    }
    requestAPILetra()
  }, [busquedaLetra])

  return (
    <Fragment>
      <Buscador
        setBusquedaLetra = {setBusquedaLetra}
      />
      {error
        ? <p className="text-4xl text-center text-red-600 mt-5">No se encontraron resultados <i className="fas fa-volume-mute"></i></p>
        :
        <div className="flex flex-col md:flex-row md:px-20">
          <div className="w-6/12">
            <Info
              info = {info}
            />
          </div>
          <div className="w-6/12">
            <Letra
              cancion = {cancion}
              letra = {letra}
            />
          </div>
        </div>
      }
    </Fragment>
  );
}

export default App;
