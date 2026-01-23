import React, { useEffect, useState } from 'react'
import slide1 from "../assets/slide1.jpg"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slide3.jpg"

const slides = [slide1, slide2, slide3];
const HeroSlider = () => {

  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className='relative min-h-[40vh] md:h-screen overflow-hidden'>

      {slides.map((img, index) => (
      
        <div
          key={index}
          className={`absolute inset-0 bg-cover transition-opacity duration-1000 ${
            index === current? "opacity-100" : "opacity-0"
          }`}
        
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center top"
            }}
        
        />
    ))}

      


      <div className='absolute inset-0 bg-black/40' />



      <div className='relative z-10 h-full flex flex-col items-center justify-end pb-24 md:justify-center md:pb-0 text-white mt-100'>
        <h1 className='text-4xl md:text-6xl font-bold tracking-widest mb-6'>
          New Collection
        </h1>
     
        <button
          onClick={() => {
            document.getElementById("featured-products")
            ?.scrollIntoView({behavior: "smooth"})
          }}
          className='px-6 py-2 md:px-8 md:py-3 border border-white rounded-full hover:text-black transition text-sm md:text-base'>Shop Now</button>
     
      </div>


    </section>
  )
}

export default HeroSlider