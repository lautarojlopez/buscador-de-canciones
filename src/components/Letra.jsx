

function Letra({cancion, letra}) {

  if(letra === ''){
    return null
  }

  return(
    <div className="flex flex-col justify-center items-center my-5 w-12/12 px-8 md:px-0">
      <h2 className="text-center uppercase border-b-4 border-sky-800 text-4xl mb-3">LETRA</h2>
      <p className="letra text-center">{letra}</p>
    </div>
  )

}

export default Letra
