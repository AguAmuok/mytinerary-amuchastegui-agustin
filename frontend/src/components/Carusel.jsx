import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import picture from './Location'



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
          {picture.map((foto) => {
            // console.log(fotos.map)
            return (
              <div key={foto.name} className="carrusel">
                <div
                  className="divCarrusel"
                  style={{
                    backgroundImage: `url("${foto.image}")`,
                    backgroundPosition: 'center',
                    margin: '.5vh',
                    backgroundSize: "cover",                                        
                  }}
                >
                  <div style={{ height: "10vh" }}>
                    <h3 style={{}} className="tituloCiudades">
                      {foto.name}
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


