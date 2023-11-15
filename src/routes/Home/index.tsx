import Page from '../../components/Page';
import AppHeader from '../../components/AppHeader';
import Content from '../../components/Content';
import { useAppSelector } from '../../hooks/redux';

function Home() {
  const recipes = useAppSelector((state) => state.recipes.list);

  return (
    <Page>
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
