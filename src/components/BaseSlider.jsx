import React from 'react';
import Slider from 'react-slick';
import './BaseSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderItem = (props) => {
  const { imageUrl, typeTitle } = props
  return (
    <a href="/">
      <img src={imageUrl} alt={typeTitle} style={{ width: '100%' }}  />
    </a>
  )
}

function BaseSlider(props) {
  const { bannerList } = props;
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      { bannerList.length > 0 &&
        bannerList.map(banner => {
          return (
            <SliderItem 
              {...banner}
              key={banner.targetId}
            />
          )
        })
      }
    </Slider>
  );
}

export default BaseSlider;