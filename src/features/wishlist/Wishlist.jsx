import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WishlistCard from "./WishlistCard";
import { fetchWishlist, deleteFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (id) => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
    toast.success("Item added to cart");
  };

  const handleRemove = (id) => {
    dispatch(deleteFromWishlist(id));
    toast.success("Item removed from wishlist");
  };

  return (
    <div className="pt-[45px] min-h-screen bg-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#91542b]">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {wishlist.map((item) => (
          <WishlistCard
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            currentPrice={item.currentPrice}
            oldPrice={item.oldPrice}
            onAddToCart={handleAddToCart}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
