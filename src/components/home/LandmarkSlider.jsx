"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

const landmarks = [
  {
    id: 1,
    name: "EMAAR SERENITY HILLS, GURUGRAM",
    image: "/images/landmarks/serenity-hills.jpg",
    link: "/projects/emaar-serenity-hills",
  },
  {
    id: 2,
    name: "URBAN ASCENT, GURUGRAM",
    image: "/images/landmarks/urban-ascent.jpg",
    link: "/projects/urban-ascent",
  },
  {
    id: 3,
    name: "ELITE OASIS, LUCKNOW",
    image: "/images/landmarks/elite-oasis.jpg",
    link: "/projects/elite-oasis",
  },
  {
    id: 4,
    name: "EMAAR INDIA BUSINESS CENTRE, GURUGRAM",
    image: "/images/landmarks/business-centre.jpg",
    link: "/projects/emaar-india-business-centre",
  },
  {
    id: 5,
    name: "MOHALI HILLS RESIDENTIAL PLOTS, MOHALI",
    image: "/images/landmarks/mohali-hills.jpg",
    link: "/projects/mohali-hills",
  },
  {
    id: 6,
    name: "MOHALI HILLS RESIDENTIAL PLOTS, MOHALI",
    image: "/images/landmarks/mohali-hills.jpg",
    link: "/projects/mohali-hills",
  },
];

export default function LandmarkSlider() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".landmark-prev",
        nextEl: ".landmark-next",
      }}
      loop={true}
      spaceBetween={20}
      slidesPerView={1.2}
      breakpoints={{
        640: {
          slidesPerView: 1.2,
        },
        1024: {
          slidesPerView: 4.3,
        },
        1280: {
          slidesPerView: 4.3,
        },
      }}
      className="w-full"
    >
      {landmarks.map((landmark) => (
        <SwiperSlide key={landmark.id} className="select-none">
          <Link href={landmark.link} className="flex flex-col items-center">
            {/* IMAGE */}
            <div className="group aspect-2/1 w-full overflow-hidden lg:aspect-video">
              <Image
                src={landmark.image}
                alt={landmark.name}
                width={1200}
                height={700}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 1023px) 82vw, 24vw"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-2 w-11/12 text-center font-[optima]! text-lg uppercase lg:mt-6 lg:w-10/12 lg:text-2xl lg:text-[24px]">
              {landmark.name}
            </h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}