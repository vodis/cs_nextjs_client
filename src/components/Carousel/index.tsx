'use client'

import React from "react";
import {ICarousel} from "@src/components/Carousel/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from "next/image";

const Carousel: React.FC<ICarousel> = (props) => {
    return (
        <div className="carousel">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={props.isMobile ? 'auto' : 3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="w-full"
                onSlideChange={props.onSlideChange}
            >
                {props.srcs.map(({ img, title }, i) => (
                    <SwiperSlide key={i}>
                        <Image src={img as string} alt={title} width={400} height={400} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carousel;
