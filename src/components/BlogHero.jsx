import blogHero from "../assets/hero-blog.jpg";
import { Link } from "react-router-dom";

const BlogHero = () => {
  return (
    <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={blogHero}
        alt="Our Story"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* GRADIENT OVERLAY */}
      <div className="
        absolute inset-0
        bg-gradient-to-b
        from-black/60 via-black/40 to-black/70
      " />

      {/* CONTENT */}
      <div className="
        relative z-10 h-full
        max-w-7xl mx-auto px-6
        flex items-center
      ">
        <div className="text-white max-w-xl space-y-6">

          <p className="uppercase tracking-[0.3em] text-xs text-gray-300">
            Our Journey
          </p>

          <h1 className="
            text-4xl md:text-6xl
            font-semibold leading-tight
          ">
            Designed With <br /> Purpose
          </h1>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            We believe fashion is more than clothing.
            It’s a reflection of identity, intention,
            and modern living.
          </p>

          <Link
            to="/blog"
            className="
              inline-block mt-4
              border border-white
              px-6 py-3 rounded-full text-sm
              hover:bg-white hover:text-black
              transition
            "
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
