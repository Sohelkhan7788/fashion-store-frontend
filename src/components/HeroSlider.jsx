import { useEffect, useState } from "react";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const slides = [slide1, slide2, slide3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] md:h-screen overflow-hidden">

      {/* SLIDES */}
      {slides.map((img, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-all duration-[1200ms]
            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        >
          <img
            src={img}
            alt="Fashion slide"
            className="h-full w-full object-cover object-top"
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="
        relative z-10 h-full
        max-w-7xl mx-auto px-6
        flex items-end md:items-center
        pb-24 md:pb-0
      ">
        <div className="text-white max-w-xl space-y-6">

          <p className="uppercase tracking-[0.3em] text-xs text-gray-300">
            New Season 2026
          </p>

          <h1 className="
            text-4xl md:text-6xl
            font-semibold leading-tight
          ">
            Designed for <br /> Modern Living
          </h1>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Discover elevated essentials crafted with
            precision, comfort, and timeless style.
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                document
                  .getElementById("featured-products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                bg-white text-black
                px-6 py-3 rounded-full text-sm
                hover:bg-black hover:text-white
                transition
              "
            >
              Shop Collection
            </button>

            <button
              className="
                border border-white
                px-6 py-3 rounded-full text-sm
                hover:bg-white hover:text-black
                transition
              "
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* SLIDE INDICATORS */}
      <div className="
        absolute bottom-6 left-1/2 -translate-x-1/2
        flex gap-2 z-20
      ">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`
              h-2 w-2 rounded-full transition-all
              ${i === current ? "bg-white w-6" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
