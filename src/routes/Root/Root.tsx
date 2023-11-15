import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getRecipes } from '../../store/reducers/recipes';
import Menu from '../../components/Menu';
import './Root.scss';
import Loading from '../../components/App/Loading';

function Root() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.recipes.isLoading);
  const location = useLocation();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Menu />

      <Outlet />
    </div>
  );
}

export default Root;
