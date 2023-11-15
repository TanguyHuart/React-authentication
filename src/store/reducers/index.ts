import recipesReducer from './recipes';
import userReducer from './user';
import loginReducer from './login';

const reducer = {
  recipes: recipesReducer,
  user: userReducer,
  login: loginReducer,
};

export default reducer;
