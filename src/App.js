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
  const [errorLetra, setErrorLetra] = useState(false)
  const [errorArtista, setErrorArtista] = useState(false)
  const {artista, cancion} = busquedaLetra

  useEffect(() => {
    if(busquedaLetra.artista === '' || busquedaLetra.cancion === '' || Object.keys(busquedaLetra).length === 0){
      return
    }

    const requestAPILetra = async () =>{
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`
      const [letra, informacion] = await Promise.all([
        axios.get(url).then( response => {
          setErrorLetra(false)
          return response
        }).catch( (error) =>{
          setErrorLetra(true)
          return
        }),
        axios.get(url2).then( response => {
          setErrorArtista(false)
          return response
        } ).catch( (error) =>{
          setErrorArtista(true)
          return
        })
      ])

      if(!errorLetra && !errorArtista){
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
      {(errorLetra || errorArtista)
        ? <p className="text-4xl p-5 text-center text-red-600 mt-5">No se encontraron resultados <i className="fas fa-volume-mute"></i></p>
        :
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
      }
    </Fragment>
  );
}

export default App;
