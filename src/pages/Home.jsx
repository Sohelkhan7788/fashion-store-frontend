import BlogHero from "../components/BlogHero";
import HeroSlider from "../components/HeroSlider";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
    return (
        <>
            <HeroSlider />
            <br /><br />
        <BlogHero />
        <br /><br />
        <section id="featured-products" className="py-12 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Featured Products
          </h2>
          
          <ProductGrid />
          <br />
            <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        {/* SERVICE 1 */}
        <div className="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

          <h3 className="font-semibold">Free Shipping & Returns</h3>
        </div>

        {/* SERVICE 2 */}
        <div className="flex flex-col items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
                  className="h-8 w-8"
                  class="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6a4.5 4.5 0 0 0-9 0v4.5m-.75 0h10.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5Z"
            />
          </svg>
          <h3 className="font-semibold">Secured Payments</h3>
        </div>

        {/* SERVICE 3 */}
        <div className="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

          <h3 className="font-semibold">Customer Service</h3>
        </div>

      </div>
    </section>
        </section>
        </>
  )
};

export default Home;