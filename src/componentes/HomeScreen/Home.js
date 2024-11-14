import React from "react";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="book-container info">
      <section>
        <figure>
          <img
            src="https://res.cloudinary.com/dmi8mfcre/image/upload/v1682383994/ygfdospekk9lyoqgkygp.png"
            className="logo-img"
            alt="logo ETI"
          />
        </figure>
        <h2 className="welcome">
          ¡Bienvenido a la biblioteca virtual de la ETI Capitán Anselmo Belloso!
        </h2>
        <div className="info-titulo">
          <i className="fa-solid fa-chalkboard-user icon"></i>
          <h2>Sobre la institución</h2>
        </div>
        <article>
          <p>
            <strong>
              La Escuela Técnica Industrial “Capitán Anselmo Belloso”
            </strong>
            , ubicada en el Municipio San Francisco, Estado Zulia de la
            República Bolivariana de Venezuela, fue fundada el 1º de septiembre
            de 1958, en las instalaciones que hoy ocupa el liceo Coquivacoa,
            siendo reinaugurada en ese espacio en noviembre de 1.961, bajo el
            nombre de Escuela Técnica Industrial de Maracaibo.
          </p>

          <Slider />

          <p>
            Actualmente, la institución está a cargo del Esp. Luis Montiel y su
            tren directivo cuenta con una matrícula de 2678 estudiantes,
            distribuida en 81 secciones entre Ciclo Básico y el Profesional,
            éste se divide en cuatro núcleos: Mecánico, Eléctrico, Hidrocarburo
            y Químico, brindando la posibilidad a su comunidad estudiantil de
            graduarse como Técnico Medio Industrial en máquina y herramientas,
            mecánica automotriz, mantenimiento mecánico, refrigeración,
            electricidad, electrónica, química, tecnología de los alimentos,
            petróleo, petroquímica y gas.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Home;
