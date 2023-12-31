"use client";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { urlFor } from "../../lib/client";

export default function Services({ servicesEn }) {
  const sortedData = servicesEn
    .slice()
    .sort((a, b) => a._createdAt.localeCompare(b._createdAt));
  const [swiperRef, setSwiperRef] = useState(null);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  return (
    <div
      className="bg-primary h-[650px] md:h-[750px] pt-9 xl:pt-0 px-[2rem] xl:px-0 relative"
      id="services"
    >
      <div
        className="max-w-[1124px] mx-auto md:pt-[3rem] md:pb-9 
      "
      >
        <div className="yellowDiv">
          <span className="yellowSpan">our services</span>
        </div>
      </div>
      <button
        onClick={prevHandler}
        className="w-9 h-9 absolute bottom-3 right-[5rem] xl:top-[54%] xl:left-[4rem] cursor-pointer"
      >
        <BsFillArrowLeftCircleFill className="md:text-[40px] text-3xl text-blue z-[999]" />
      </button>
      <button
        onClick={nextHandler}
        className="w-9 h-9 absolute bottom-3 right-[2rem] xl:top-[54%] xl:right-[4rem]"
      >
        <BsFillArrowRightCircleFill className="md:text-[40px] text-3xl text-blue z-50" />
      </button>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        loop={true}
        onSwiper={(swiper) => setSwiperRef(swiper)}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 32 },
          1120: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="h-[27.6rem] md:h-[29.5rem] w-[300px] md:w-[90%] lg:w-full max-w-[1124px] md:mt-3"
      >
        {sortedData.map((slide) => {
          const src = urlFor(slide.image).url();
          return (
            <SwiperSlide key={slide._id}>
              <div className=" flex flex-col bg-light rounded-2xl border border-blue cursor-pointer h-full">
                <div className="h-[12.7rem] md:h-[14rem] relative bg-light shadow-md rounded-t-2xl">
                  <Image
                    className="absolute h-full w-full object-cover p-2 rounded-t-2xl"
                    loader={() => src}
                    src={src}
                    alt=""
                    fill
                    unoptimized
                    property={1}
                    loading="lazy"
                  />
                </div>
                {/* text */}
                <div className="flex flex-col p-4 justify-center items-center">
                  <span className="text-blue font-bold text-[16px] md:text-[19px] uppercase text-center min-h-[3rem]">
                    {slide.name}
                  </span>
                  <p className="pt-2 md:pt-4 text-center text-[11px] md:text-[12.3px] font-sora leading-5 font-[500]">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
