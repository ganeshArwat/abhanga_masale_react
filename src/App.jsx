import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Website from './website/website';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import AllProducts from './features/product/AllProducts';
import ProductDetail from './features/product/ProductDetail';
import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/checkout';
import Wishlist from './features/wishlist/Wishlist';
import ForgotPassword from './features/auth/ForgotPassword';
import ResetPassword from './features/auth/ResetPassword';
import Logout from './features/auth/Logout';

const router = createBrowserRouter([
  // Landing Page
  {
        path: '/website',
        element: <Website />,
  },
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      // Shoping Site
      {
        path: '/',
        element: <AllProducts />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: '/product/:productId',
        element: <ProductDetail />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/whishlist",
        element: <Wishlist />,
      },
      {
        path: '*',
        element: <Error />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
