import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Global loading indicator */}
      {isLoading && <Loader />}

      {/* Sticky header */}
      <Header />

      {/* Main content scrollable */}
      <div className="flex-1 pt-[80px]"> {/* Header height offset */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* Persistent Cart Overview */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
