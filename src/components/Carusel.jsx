import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const fotos = [
  { nombre: "Athens", url: 'https://ak.picdn.net/shutterstock/videos/28366465/thumb/12.jpg' },
  { nombre: "Buenos Aires", url: 'https://images3.alphacoders.com/109/1095798.jpg' },
  { nombre: "Córdoba", url: 'https://as2.ftcdn.net/v2/jpg/02/34/69/51/1000_F_234695125_2Cypkto3tdJB8pXuJKCzzr63YaiKhEna.jpg' },
  { nombre: "London", url:'https://wallpaperaccess.com/full/180132.jpg' },
  { nombre: "Madrid", url: 'https://wallpapercave.com/wp/wp3995609.jpg' },
  { nombre: "Moscow", url: 'https://p4.wallpaperbetter.com/wallpaper/137/758/495/st-basils-cathedral-russia-red-square-moscow-wallpaper-preview.jpg' },
  { nombre: "Paris", url:'https://wallpaperaccess.com/full/1168013.jpg' },
  { nombre: "Petra", url:'https://besthqwallpapers.com/Uploads/28-7-2021/172205/ad-deir-4k-desert-siq-canyon-hdr.jpg' },
  { nombre: "Rome", url: 'https://fondosmil.com/fondo/60652.jpg' },
  { nombre: "Sydney", url: 'https://getwalls.io/wallpapers/318477/2020--06--sydney-harbour-1080x1920-4k-full-hd-for-iphone-mobile-pc.jpg' },
  { nombre: "TelAviv", url:'https://w0.peakpx.com/wallpaper/396/606/HD-wallpaper-tel-aviv-evening-skyscrapers-modern-buildings-tel-aviv-cityscape-israel-tel-aviv-panorama.jpg' },
  { nombre: "Toronto", url: 'https://img.besthqwallpapers.com/Uploads/13-3-2018/43946/toronto-4k-nightscapes-modern-buildings-canada.jpg' },
];



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


