import { useContext } from "react";
import MyContext from "../context/MyContext";
import IconHeart from "./IconHeart";

const Gallery = () => {
  const { imagenes, guardarImagenes} = useContext(MyContext)
  
  const setFavorito = (id) => {
    const imagenIndex = imagenes.findIndex((f) => f.id === id)
    imagenes[imagenIndex].liked = !imagenes[imagenIndex].liked
    guardarImagenes([...imagenes])
  }
  return (
  <div className="gallery grid-columns-5 p-3">
    {imagenes.map((imagen, i)=>(
      <div 
      onClick={() => setFavorito(imagen.id)}
          className='photo'
          style={{ backgroundImage: `url(${imagen.src})` }}
          key={i}
          >
            <IconHeart filled={imagen.liked} />
            <p>{imagen.alt}</p>
          </div>
    ))}
  </div>
  )
};
export default Gallery;
