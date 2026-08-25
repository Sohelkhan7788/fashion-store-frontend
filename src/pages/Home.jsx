import HeroSlider from "../components/HeroSlider";
import BlogHero from "../components/BlogHero";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      <br /><br />

      {/* BLOG STORY STRIP */}
      <section className="bg-paper">
        <BlogHero />
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="featured-products"
        className="py-24 bg-paper-dim/50"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-widest text-brass mb-3">
              Handpicked
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Featured Collection
            </h2>
          </div>

          <ProductGrid />
        </div>
      </section>

      {/* BRAND VALUES / SERVICES */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

          {/* VALUE 1 */}
          <div className="space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto h-10 w-10 text-brass"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992M2.985 19.644v-4.992h4.992l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182V4.356"
              />
            </svg>

            <h3 className="font-semibold text-lg">
              Free Shipping & Returns
            </h3>

            <p className="text-sm text-ink-soft/70 leading-relaxed">
              Seamless delivery and easy returns,
              because comfort matters.
            </p>
          </div>

          {/* VALUE 2 */}
          <div className="space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-10 w-10 text-brass"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6a4.5 4.5 0 0 0-9 0v4.5m-.75 0h10.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5Z"
              />
            </svg>

            <h3 className="font-semibold text-lg">
              Secure Payments
            </h3>

            <p className="text-sm text-ink-soft/70 leading-relaxed">
              Your transactions are protected
              with trusted payment systems.
            </p>
          </div>

          {/* VALUE 3 */}
          <div className="space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-10 w-10 text-brass"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
              />
            </svg>

            <h3 className="font-semibold text-lg">
              Customer Care
            </h3>

            <p className="text-sm text-ink-soft/70 leading-relaxed">
              Real people, real support —
              always here to help.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
