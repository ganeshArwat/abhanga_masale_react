import WishlistCard from "./WishlistCard";

const dummyWishlist = [
  {
    id: 1,
    name: "Red Chilli Powder",
    image: "/assets/img/product.jpg",
    currentPrice: 260,
    oldPrice: 380,
  },
  {
    id: 2,
    name: "Turmeric Powder",
    image: "/assets/img/product.jpg",
    currentPrice: 180,
    oldPrice: 250,
  },
  {
    id: 2,
    name: "Turmeric Powder",
    image: "/assets/img/product.jpg",
    currentPrice: 180,
    oldPrice: 250,
  },
  {
    id: 2,
    name: "Turmeric Powder",
    image: "/assets/img/product.jpg",
    currentPrice: 180,
    oldPrice: 250,
  },
  {
    id: 2,
    name: "Turmeric Powder",
    image: "/assets/img/product.jpg",
    currentPrice: 180,
    oldPrice: 250,
  },
];

const Wishlist = () => {
  const handleAddToCart = (id) => {
    console.log("Add to cart:", id);
    // dispatch(addToCart(id)) or API call
  };

  const handleRemove = (id) => {
    console.log("Remove from wishlist:", id);
    // dispatch(removeFromWishlist(id)) or API call
  };

  return (
    <div className="pt-[45px] min-h-screen bg-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#91542b]">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {dummyWishlist.map((item) => (
          <WishlistCard
            key={item.id}
            {...item}
            onAddToCart={handleAddToCart}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
