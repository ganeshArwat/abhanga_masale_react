const User = require('../models/userModel');

exports.toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  const pid = req.params.productId;

  const index = user.wishlist.indexOf(pid);
  if (index > -1) {
    user.wishlist.splice(index, 1); // remove
  } else {
    user.wishlist.push(pid); // add
  }

  await user.save();
  res.status(200).json({ status: 'success', wishlist: user.wishlist });
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('wishlist')
    .populate({
      path: 'wishlist',
      select: 'name image currentPrice oldPrice slug', // select only required fields
    });

  res.status(200).json({
    status: 'success',
    wishlist: user.wishlist,
  });
};

exports.removeFromWishlist = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: req.params.productId } },
    { new: true }
  ).populate({
    path: "wishlist",
    select: "name image currentPrice oldPrice slug",
  });

  res.status(200).json({
    status: "success",
    wishlist: user.wishlist,
  });
};