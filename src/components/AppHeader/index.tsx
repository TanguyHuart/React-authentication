import './styles.scss';
import clsx from 'clsx';
import logo from '../../assets/logo.png';
import LoginForm from '../LoginForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeField, login, logout } from '../../store/reducers/login';

function AppHeader() {
  const dispatch = useAppDispatch();
  // recupération de toute les variables necéssaires au composant depuis le store
  const emailValue = useAppSelector((state) => state.login.credentials.email);
  const passwordValue = useAppSelector(
    (state) => state.login.credentials.password
  );
  const isLoading = useAppSelector((state) => state.login.isLoading);
  const isLogged = useAppSelector((state) => state.login.logged);
  const loggedMessage = useAppSelector((state) => state.login.loggedMessage);
  const error = useAppSelector((state) => state.login.error);

  // fonction qui ira en props, fait l'appel APi en post a la soumission du formulaire de connexion
  const handleLogin = () => {
    dispatch(
      login({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  // fonction qui ira en props, execute l'action logout du loginReducer
  const handleLogout = () => {
    dispatch(logout());
  };

  // fonction qui ira en props , execute l'action changeField du loginReducer, permet de faire les input contrôlés
  const changeFieldState = (value: string, name: 'email' | 'password') => {
    dispatch(
      changeField({
        value,
        fieldName: name,
      })
    );
  };

  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="Logo oRecipes" />
      <div
        className={clsx({
          loader: isLoading,
        })}
      >
        <LoginForm
          email={emailValue}
          password={passwordValue}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          isLogged={isLogged}
          changeField={changeFieldState}
          loggedMessage={loggedMessage}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </header>
  );
}

export default AppHeader;
