import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Recipe } from '../../@types/recipe';
import { useAppSelector } from '../../hooks/redux';
import './styles.scss';

function Menu() {
  const recipes = useAppSelector((state) => state.recipes.list);
  const isLogged = useAppSelector((state) => state.login.logged);

  return (
    <nav className="menu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx('menu-link', {
            ' menu-link--active': isActive,
          })
        }
      >
        Accueil
      </NavLink>
      {isLogged && (
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            clsx('menu-link', {
              ' menu-link--active': isActive,
            })
          }
        >
          Favoris
        </NavLink>
      )}

      {recipes.map((recipe: Recipe) => (
        <NavLink
          to={`/recipe/${recipe.slug}`}
          key={recipe.id}
          className={({ isActive }) =>
            clsx('menu-link', {
              ' menu-link--active': isActive,
            })
          }
        >
          {recipe.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Menu;
