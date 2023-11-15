import './styles.scss';
import logo from '../../assets/logo.png';
import LoginForm from '../LoginForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeField, login, logout } from '../../store/reducers/login';

function AppHeader() {
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.login.credentials.email);
  const passwordValue = useAppSelector(
    (state) => state.login.credentials.password
  );
  const isLogged = useAppSelector((state) => state.login.isLogged);
  const loggedMessage = useAppSelector((state) => state.login.loggedMessage);

  const handleLogin = () => {
    dispatch(
      login({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
      <LoginForm
        email={emailValue}
        password={passwordValue}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isLogged={isLogged}
        changeField={changeFieldState}
        loggedMessage={loggedMessage}
      />
    </header>
  );
}

export default AppHeader;
