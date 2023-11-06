import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyContext from './context/MyContext';
import Favorites from './views/Favorites';
import Home from './views/Home';

const PHOTO_URL = '/photos.json';

const App = () => {
  const [imagenes, setImagenes] = useState([]);

  const guardarImagenes = (imagenes) => {
    setImagenes(imagenes);
  };

  const getImagenes = async () => {
    try {
      const response = await fetch(PHOTO_URL);
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      const data = await response.json();

      if (data && data.photos) {
        const imagenesTransformadas = data.photos.map((imagen) => ({
          id: imagen.id,
          src: imagen.src.tiny,
          alt: imagen.alt,
          liked: imagen.liked,
        }));
        guardarImagenes(imagenesTransformadas);
      } else {
        console.error('El formato del archivo JSON es incorrecto');
      }
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
    }
  };

  useEffect(() => {
    getImagenes();
  }, []);

  return (
    <MyContext.Provider value={{ imagenes, guardarImagenes }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </MyContext.Provider>
  );
};

export default App;