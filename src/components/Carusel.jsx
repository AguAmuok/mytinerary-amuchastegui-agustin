import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fotos from './Location'


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      className: "slider",
      infinite: true,
      slidesToShow: 1,
      rows: 2,
      slidesPerRow: 2,
      // slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1900,
      fade: true,
      pauseOnDotsHover: false,
      //  dots: true,
    };

    return (
      <>
      <h2 className='popular'>Popular MyTinerary</h2>
      <div className="contenedorCarr">        
      <div className= 'contenedorcarurel'>        
        <Slider {...settings}>
          {fotos.map((foto) => {
            // console.log(fotos.map)
            return (
              <div key={foto.nombre} className="carrusel">
                <div
                  className="divCarrusel"
                  style={{
                    backgroundImage: `url("${foto.url}")`,
                    backgroundPosition: 'center',
                    margin: '.5vh',
                    backgroundSize: "cover",
                    borderRadius: "2%",                    
                  }}
                >
                  <div style={{ height: "10vh" }}>
                    <h3 style={{}} className="tituloCiudades">
                      {foto.nombre}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        </div>
      </div>
      </>
    );
  }
}


