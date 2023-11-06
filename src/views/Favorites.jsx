import { useContext } from 'react'
import MyContext from '../context/MyContext'
const Favorites = () => {
  const { imagenes } = useContext(MyContext)
  const contImagenes = imagenes.filter((imagen) => imagen.liked).length
  return (
    <div className='App'>
      <h1>Fotos favoritas</h1>
      <div className='gallery p-3 grid-columns-4'>
        {contImagenes === 0
          ? (<p><span>No hay fotos favoritas</span></p>)
          : (
              imagenes
                .filter((imagen) => imagen.liked)
                .map((imagen, i) => <img src={imagen.src} alt={imagen.alt} key={i} />)
            )}
      </div>
    </div>
  )
}
export default Favorites