import Page from '../../components/Page';
import AppHeader from '../../components/AppHeader';
import Content from '../../components/Content';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeRecipesState, getRecipes } from '../../store/reducers/recipes';
import Loading from '../../components/App/Loading';

function Home() {
  const dispatch = useAppDispatch();
  dispatch(getRecipes());
  const recipes = useAppSelector((state) => state.recipes.list);
  const isLoading = useAppSelector((state) => state.recipes);

  return (
    <Page>
      {isLoading && <Loading />}

      <AppHeader />
      <Content
        title="Les recettes oRecipes"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, explicabo."
        recipes={recipes}
      />
    </Page>
  );
}

export default Home;
