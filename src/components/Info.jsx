import defaultimg from '../default.jpg'

function Info({info}) {

  if(Object.keys(info).length === 0){
    return null
  }

  let imagen = '';
  if(!info.strArtistThumb){
    imagen = defaultimg
  }
  else{
    imagen = info.strArtistThumb
  }

  return(
    <div className="flex flex-col justify-center items-center px-8 md:px-0 my-5 w-12/12">
      <h2 className="text-center uppercase border-b-4 border-sky-800 text-4xl mb-3">{info.strArtist}</h2>
      <img className="w-8/12 my-5" src={imagen} alt="" />
      <p className="mb-2">Genero: {info.strStyle ? info.strStyle : 'Desconocido'}</p>
      <h3 className="text-center uppercase border-b-4 border-sky-800 text-4xl mb-3">Biografía:</h3>
      <p className="">{info.strBiographyES ? info.strBiographyES : "Información no disponible"}</p>
    </div>
  )

}

export default Info
