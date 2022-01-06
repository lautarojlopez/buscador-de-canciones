import {Fragment, useState, useEffect} from 'react'
import Buscador from './components/Buscador'
import Letra from './components/Letra'
import Info from './components/Info'
import Error from './components/Error'
import axios from 'axios'

function App() {

  //State
  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('')
  const [info, setInfo] = useState({})
  const {artista, cancion} = busquedaLetra

  useEffect(() => {
    if(busquedaLetra.artista === '' || busquedaLetra.cancion === '' || Object.keys(busquedaLetra).length === 0){
      return
    }

    const requestAPILetra = async () =>{
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`
      //API LETRAS
      const letra = await axios.get(url).catch( (error) =>{ return undefined } )
      //API INFO ARTISTA
      const informacion = await axios.get(url2)

      let lyrics;
      if(letra !== undefined){
        lyrics = letra.data.lyrics
      }else{
        lyrics = 'Letra no encontrada'
      }
      setInfo(informacion.data.artists[0])
      setLetra(lyrics)

    }
    requestAPILetra()
  }, [busquedaLetra])

  return (
    <Fragment>
      <Buscador
        setBusquedaLetra = {setBusquedaLetra}
      />
        <div className="flex flex-col-reverse items-center justify-center md:items-start md:flex-row md:px-20">
          <div className="w-full md:w-6/12">
            <Info
              info = {info}
            />
          </div>
          <div className="w-full md:w-6/12">
            <Letra
              cancion = {cancion}
              letra = {letra}
            />
          </div>
        </div>
    </Fragment>
  );
}

export default App;
