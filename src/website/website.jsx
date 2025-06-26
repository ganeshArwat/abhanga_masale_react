
import { Link } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const NavBar = () => {
   const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 bg-[#f3f9e3] shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 flex justify-between items-center h-20">
        <ScrollLink
            to="hero-section"
            smooth={true}
            duration={500}
            className="flex items-center space-x-1"
        >
            <img
                src="/assets/img/logo.png"
                alt="Abhanga Masale logo"
                className="h-14 w-auto rounded-lg object-contain"
            />
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 text-[1.1rem] font-normal">
            <ScrollLink
                to="featured-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer hover:text-[#91542b] transition duration-200"
            >Featured Spices</ScrollLink>
            <ScrollLink
                to="about-us-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer hover:text-[#91542b] transition duration-200"
            >About Us</ScrollLink>
            <ScrollLink
                to="shop-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer hover:text-[#91542b] transition duration-200"
            >Shop</ScrollLink>
            <ScrollLink
                to="cta-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer hover:text-[#91542b] transition duration-200"
            >Sign-Up</ScrollLink>
            <a
                href="/html/shop/all_product.html"
                target="_blank"
                className="bg-[#91542b] text-[#f3f9e3] hover:bg-[#333] transition px-5 py-2 rounded-lg"
            >
                Try Now
            </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="text-3xl text-[#333] focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {navOpen && (
        <div className="md:hidden bg-[#f3f9e3] px-6 pb-6 pt-2 shadow-lg space-y-4">
          <a href="#featured-section" className="block text-[#333] text-lg hover:text-[#91542b]">Featured</a>
          <a href="#about-us-section" className="block text-[#333] text-lg hover:text-[#91542b]">About Us</a>
          <a href="#shop-section" className="block text-[#333] text-lg hover:text-[#91542b]">Shop</a>
          <a href="#cta" className="block text-[#333] text-lg hover:text-[#91542b]">Contact</a>
          <a
            href="/html/shop/all_product.html"
            target="_blank"
            className="block text-center bg-[#91542b] text-[#f3f9e3] hover:bg-[#333] transition px-4 py-2 rounded-lg"
          >
            Try Now
          </a>
        </div>
      )}
    </header>
  );
}


const HeroSection = () => {
     return (
        <Element
        name="hero-section"
        className="bg-[#f3f9e3] w-full pt-24 md:pt-25 pb-12"
        >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
            <h2 className="text-[#91542b] text-3xl font-semibold">Abhanga Masale</h2>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#333]">
                Unlock the Magic of Pure Spices!
            </h1>
            <p className="text-lg text-[#555] leading-relaxed">
                Bring home the richness of handpicked spices and elevate every meal with taste and tradition.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                href="#cta"
                className="inline-block text-[#f3f9e3] bg-[#91542b] hover:bg-[#333] px-6 py-3 text-base font-semibold rounded-lg transition"
                >
                Shop Now
                </a>
                <a
                href="#how"
                className="inline-block text-[#333] border border-[#333] hover:bg-[#333] hover:text-[#f3f9e3] px-6 py-3 text-base font-semibold rounded-lg transition"
                >
                Discover Our Spices ↓
                </a>
            </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center items-center">
            <img
                src="/assets/img/heroImage1.png"
                alt="Spices showcase"
                className="w-3/4 max-w-md object-contain z-10 rounded-lg"
            />
            </div>
        </div>
        </Element>
    );
};

const featuredSpices = [
  {
    name: "Red Chilly",
    image: "/assets/img/heroImage1.png",
  },
  {
    name: "Turmeric Powder",
    image: "/assets/img/heroImage1.png",
  },
  {
    name: "Garam Masala",
    image: "/assets/img/heroImage1.png",
  },
];

function FeaturedSpices() {
  return (
    <Element name="featured-section" className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-12">
          <span className="block w-16 h-[2px] bg-black mr-4"></span>
          <h2 className="text-3xl font-semibold text-[#333]">Our Featured Spices</h2>
          <span className="block w-16 h-[2px] bg-black ml-4"></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
          {featuredSpices.map((spice, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={spice.image}
                alt={spice.name}
                className="w-[220px] md:w-[260px] h-auto object-contain drop-shadow-xl"
              />
              <h4 className="mt-4 text-lg font-semibold text-[#333]">{spice.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}
function AboutUs() {
  return (
    <Element
      name="about-us-section"
      className="grid grid-cols-1 md:grid-cols-2 w-full"
    >
      {/* Left: Content */}
      <div className="bg-[#b1912e] text-white flex flex-col justify-center items-center text-center px-8 py-20">
        <img
          src="/assets/img/logo.png"
          alt="Abhanga Masale Logo"
          className="h-24 mb-6 rounded-lg"
        />
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="text-base leading-relaxed max-w-xl mb-6">
          Rooted in a deep passion for taste and tradition, Abhanga Masale brings
          you a meticulously crafted blend of hand-selected spices to elevate your cooking.
          Experience the magic of authentic flavors in every pinch, turning every meal
          into a masterpiece of aroma and taste.
        </p>
        <a
          href="#shop-section"
          className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-[#b1912e] transition"
        >
          Discover the Magic
        </a>
      </div>

      {/* Right: Image */}
      <div
        className="bg-cover bg-center h-[400px] md:h-auto"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(13, 31, 20, 0.4), rgba(13, 31, 20, 0.4)), url('/assets/img/market.jpg')",
        }}
      ></div>
    </Element>
  );
}

function ShopSection() {
  return (
    <Element name="shop-section" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center mb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              src="/assets/img/heroImage1.png"
              alt="Abhanga Masale Product"
              className="w-64 object-contain"
            />
          ))}
        </div>

        {/* Center Text Section */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center mb-16 items-center">
            {/* Product Left */}
            <img
                src="/assets/img/heroImage1.png"
                alt="Abhanga Masale Product"
                className="w-64 object-contain col-span-2 md:col-span-1"
            />


            {/* Center Text Block */}
            <div className="text-center col-span-2 md:col-span-2">
                <h3 className="text-5xl font-bold text-[#931f1d] leading-tight mb-4">
                Abhanga <br /> Masale
                </h3>
                <h5 className="text-2xl text-[#333] font-medium mb-2">Online Shop</h5>
                <p className="text-[#9e3534] text-base mb-4 px-2">
                Explore our finest collection of pure and aromatic spices,<br />
                delivered to your doorstep.
                </p>
                <a
                href="#cta"
                className="inline-block bg-[#931f1d] text-[#f3f9e3] px-6 py-3 rounded-lg hover:bg-[#f3f9e3] hover:text-[#931f1d] border border-[#931f1d] transition font-semibold"
                >
                Go to Shop
                </a>
            </div>


            {/* Product Right */}
            <img
                src="/assets/img/heroImage1.png"
                alt="Abhanga Masale Product"
                className="w-64 object-contain col-span-2 md:col-span-1"
            />
        </div>

        {/* More Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              src="/assets/img/heroImage1.png"
              alt="Abhanga Masale Product"
              className="w-64 object-contain"
            />
          ))}
        </div>
      </div>
    </Element>
  );
}

const CTASection = () => {
  return (
    <Element name="cta-section" className="py-20 bg-gradient-to-br from-[#91542b] to-[#6d3d20] text-[#f3f9e3]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Left Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Spice Up Your Kitchen?
          </h2>
          <p className="text-lg mb-8 text-[#f7f5eb]">
            Join the Abhanga Masale family and explore pure, aromatic spices like never before.
          </p>

          <Link
            to="/signup" // OR replace with: href="/signup"
            className="inline-block px-8 py-4 text-lg font-semibold rounded bg-[#333] text-[#fff] border border-[#333] hover:text-[#333] hover:bg-[#f3f9e3] transition"
          >
            Sign Up Now
          </Link>
        </div>

        {/* Right Image Section */}
        <div
          className="h-80 md:h-96 w-full rounded-lg shadow-lg bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/img/cta_form.jpg')`,
          }}
          role="img"
          aria-label="Aromatic spices background"
        ></div>
      </div>
    </Element>
  );
};

const Website = () => {
    return(
        <>
            <NavBar />
            <HeroSection />
            <FeaturedSpices />
            <AboutUs />
            <ShopSection />
            <CTASection />
        </>
    )
};

export default Website;
