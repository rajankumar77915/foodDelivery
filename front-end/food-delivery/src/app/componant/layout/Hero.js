import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
const Hero = ({ swiperFood = "" }) => {
  // Dummy swiperFood array with sample data
  const dummySwiperFood = [
    {
      title: ["Everything", "is better", "with food"],
      description: " Crispy on the outside and tender on the inside, the french fries were the epitome of perfection.",
      image: "/image.png",
      alt: "Delicious Burger",
    },
    {
      title: ["sandwitch", "Tomato", "with extra chizze"],
      description: "Fresh sushi rolls with assorted and vegetables",
      image: "/image1.jpeg",
      alt: "Scrumptious Sushi",
      myclass: "  w-3/4 pt-14"
    }
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        color={"yellow-5"}
        pagination={{ clickable: true }}

        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        autoplay={{ delay: 3000 }}
        className="min-h-full"
      >
        {dummySwiperFood.map((food, i) => (
       <SwiperSlide key={i}>
       <section className="hero flex bg-gradient-to-r from-fuchsia-50 to-richblack-700 rounded-lg">
         <img src={food.image} className="sm:h-80 h-48 w-full " alt="Food" />
       </section>
     </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
