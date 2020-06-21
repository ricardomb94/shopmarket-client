import React from 'react';
import Slider from "react-slick";
import SlideItems from './SlideItems'
import slideItems from '../slideItems';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'


// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "none",width:"30px"}}
//         onClick={onClick}
//       />
//     );
//   }

//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "none"}}
//         onClick={onClick}
//       />
//     );
//   }

const settings = {

    dots: false,
    infinite: true,
    //centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    fade:true,
    pauseOnHover: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,

    responsive: [
           {
             breakpoint: 768,
             settings: {
               // dots: true,
               arrows: false,
               infinite: false,
               slidesToShow: 1,
               slidesToScroll: 1,
               swipeToSlide: true,
             }
           },
          {
             breakpoint: 425,
             settings: {
               dots: false,
               arrows: false,
               infinite: true,
               slidesToShow: 1,
               slidesToScroll: 0,
               swipeToSlide: true,
               cssEase: 'fade',
               fade:true,
             }
           },
           {
            breakpoint: 375,
              settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 0,
              swipeToSlide: true,
              cssEase: 'linear'
            }
          },
           {
             breakpoint: 300,
             settings: 'unslick',
           }
         ]
};

const SliderEvent = () => (


    <Slider {...settings} className="sliderEvent">
        {
            slideItems.map(slideItems => (
                <SlideItems 
                    key={slideItems.id}
                    slideItemsImg={slideItems.img}
                    slideItemsContent={slideItems.content}
                />
            ))
        }
        
    </Slider>
)

export default SliderEvent