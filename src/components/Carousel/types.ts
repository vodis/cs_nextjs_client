import {Swiper as SwiperClass} from "swiper/types";

export interface ICarousel {
    srcs: ISrcs[];
    isMobile?: boolean;
    onSlideChange: (e: SwiperClass) => void
}

interface ISrcs {
    title: string;
    img?: string;
}
