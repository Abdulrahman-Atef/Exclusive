import React from "react";
import Slider from "react-slick";

export default function ProductSlider({id , data}) {


  const settings = {
    customPaging: function (i) {
      return <a className="w-100 h-100 d-block">
        {data?.images[i]?
          <img src={data?.images[i]} className={`d-block border rounded-2 h-100 w-100`} alt={`slide ${i}`} />
        :''}
      </a>
    },
    dots: true,
    arrows:false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return <>
      {data?<>
            {data?<Slider {...settings}>
            {data?.images[0]?<div className="d-flex justify-content-center">
              <img src={data?.images[0]} className="w-100" style={{maxHeight:'480px'}} alt="Slide 1" />
            </div>:''}
            {data?.images[1]?<div className="d-flex justify-content-center">
              <img src={data?.images[1]} className="w-100" style={{maxHeight:'480px'}} alt="Slide 2" />
            </div>:''}
            {data?.images[2]?<div className="d-flex justify-content-center">
              <img src={data?.images[2]} className="w-100" style={{maxHeight:'480px'}} alt="Slide 3" />
            </div>:''}
            {data?.images[2]?<div className="d-flex justify-content-center">
              <img src={data?.images[3]} className="w-100" style={{maxHeight:'480px'}} alt="Slide 4" />
            </div>:''}
          </Slider>:''}
      </>:''}
      
      
    </>
  
}
