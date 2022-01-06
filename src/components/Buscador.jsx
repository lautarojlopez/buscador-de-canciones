import {useState} from 'react'

function Buscador({setBusquedaLetra}) {

  const [busqueda, setBusqueda] = useState({
    artista: '',
    cancion: ''
  })
  const [error, setError] = useState(false)

  const updateState = (e) =>{
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }
  const {artista, cancion} = busqueda

  //onSubmit
  const buscarInformacion = (e) => {
    e.preventDefault()

    if(artista.trim() === '' || cancion.trim() === ''){
      setError(true)
    }
    else{
      setError(false)
    }

    setBusquedaLetra(busqueda)

  }

  return(
    <div className="flex flex-col h-auto py-10 bg-sky-900 flex justify-center items-center">
      <h1
        className="font-work text-4xl text-white bg-indigo-700 p-4 rounded border-b-4 border-indigo-600 rounded-tl-xl rounded-br-xl transition-all ease-in-out duration-100">
        <i className="fas fa-compact-disc animate-spin"></i> <i className="fas fa-music animate-bounce text-sm relative -top-5"></i> Buscador de Letras de Caciones
      </h1>
      <form
        onSubmit = {buscarInformacion}
        className="flex flex-col mt-5 w-8/12 justify-center items-center">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-8/12 mr-3">
            <label className={`text-xl ${error && artista.trim() === '' ? 'text-red-500' : 'text-white'}`}><i className="fas fa-user"></i> Artista</label>
            <input
              onChange={updateState}
              value={artista}
              className={`focus:outline-none p-2 text-white text-xl border-b-4  bg-transparent transition-all ease-linear duration-150 ${error && artista.trim() === '' ? "border-red-500 hover:border-red-600 focus:border-red-600" : "border-sky-800 hover:border-sky-500 focus:border-sky-500"}`}
              type="text"
              name="artista"
              placeholder="Ej: Bad Bunny, Taylor Swift, BTS"
             />
             <p className={`text-md text-red-500 font-bold text-center transition-all ease-linear duration-150 ${error && artista.trim() === '' ? 'visible opacity-100': 'invisible opacity-0'}`}>Escribe un artista</p>
          </div>
          <div className="flex flex-col w-8/12 ml-3">
            <label className={`text-xl ${error && cancion.trim() === '' ? 'text-red-500' : 'text-white'}`}><i className="fas fa-play-circle"></i> Canción</label>
            <input
              onChange={updateState}
              value={cancion}
              className={`focus:outline-none p-2 text-white text-xl border-b-4  bg-transparent transition-all ease-linear duration-150 ${error && cancion.trim() === '' ? "border-red-500 hover:border-red-600 focus:border-red-600" : "border-sky-800 hover:border-sky-500 focus:border-sky-500"}`}              type="text"
              name="cancion"
              placeholder="Ej: Todo de tí, Mienteme"
            />
            <p className={`text-md text-red-500 font-bold text-center transition-all ease-linear duration-150 ${error && cancion.trim() === '' ? 'visible opacity-100': 'invisible opacity-0'}`}>Escribe una canción</p>
          </div>
        </div>
        <button
          className="font-work text-2xl mt-5 w-6/12 text-white bg-indigo-700 p-3 rounded border-b-4 border-indigo-600 rounded-tl-xl rounded-br-xl transition-all ease-in-out duration-200 hover:bg-indigo-800 hover:border-indigo-700">
          <i className="fas fa-search"></i> Buscar
        </button>
      </form>
    </div>
  )

}

export default Buscador
