import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navigate } from "react-router-dom";

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
import AdminLayout from './ui/AdminLayout';
import CategoryList from './features/category/CategoryList';
import Dashboard from './features/admin/Dashboard';
import ProductList from './features/admin/products/ProductList';
import OrderList from './features/admin/orders/OrderList';
import OrderDetail from './features/admin/orders/OrderDetail';
import OrderSuccess from './ui/OrderSuccess';
import MyOrders from './features/orders/MyOrders';
import OrderDetails from './features/orders/OrderDetails';

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
        path: '/product/:productSlug',
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
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/orders",
        element: <MyOrders />,
      },
      {
        path: "/order/:orderId",
        element: <OrderDetails />,
      },
      {
        path: '*',
        element: <Error />,
      }
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // This handles /admin
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'categories',
        element: <CategoryList />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetail />,
      }
    ],
  },
  {
    path: '*',
    element: <Error />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
