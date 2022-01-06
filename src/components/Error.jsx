import {animateScroll as scroll} from 'react-scroll'

function Error({mensaje}) {

  scroll.scrollTo(window.innerHeight)

  return(
    <p
    className="text-4xl p-5 min-h-screen text-center text-red-600 mt-5">
    {mensaje} <i className="fas fa-volume-mute"></i>
    </p>
  )

}

export default Error
