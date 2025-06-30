import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Loader from './Loader';
import { Outlet, useNavigation } from 'react-router-dom';
import { loadUser } from './../features/auth/authSlice';
import { useEffect } from 'react';

function AppLayout() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(token, user);
    if (token && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, token, user]);

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Global loading indicator */}
      {isLoading && <Loader />}

      {/* Sticky header */}
      <Header />

      {/* Main content scrollable */}
      <div className="flex-1 pt-[88px]"> {/* Header height offset */}
        <main >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
