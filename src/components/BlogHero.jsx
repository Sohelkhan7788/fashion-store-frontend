import React from 'react'
import blogHero from "../assets/hero-blog.jpg";
import { Link } from "react-router-dom";
const BlogHero = () => {
  return (
    <>
    <section className='relative min-h-[40vh] md:min-h-[80vh] overflow-hidden'>
        <div className='absolute inset-0 bg-cover bg-top md:bg-center'
          
            style={{backgroundImage: `url(${blogHero})`}}
          
        />

        <div className='absolute inset-0 flex items-center justify-center'>
          <Link to="/blog"
                className='text-4xl md:text-5xl font-semibold text-white hover:underline'
          >Our Story</Link>
        </div>

      </section>

     </>
  )
}

export default BlogHero