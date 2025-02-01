import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/autoplay";
import "swiper/css/pagination"; 
import { Autoplay, Pagination } from "swiper/modules"; 

const SlideSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]} 
      spaceBetween={0}
      slidesPerView={1} 
      loop={true} 
      autoplay={{
        delay: 2500, 
        disableOnInteraction: false, 
      }}
      pagination={{
        clickable: true, 
        dynamicBullets: true, 
      }}
    >

      <SwiperSlide>
        <div>
            <img src="/SliderSwiper/1.gif" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
            <img src="/SliderSwiper/1.gif" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
            <img src="/SliderSwiper/1.gif" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
            <img src="/SliderSwiper/1.gif" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SlideSwiper;
