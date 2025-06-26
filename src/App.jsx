import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Website from './website/website';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import AllProducts from './features/product/AllProducts';
import ProductDetail from './features/product/ProductDetail';

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
        path: '/product/:productId',
        element: <ProductDetail />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
