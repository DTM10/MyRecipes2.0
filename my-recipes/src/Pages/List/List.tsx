import styles from './List.module.scss';
import { useAppSelector } from '../../Redux/hooks';
import Card from '../../Components/Card/Card';
import { BORDER_VALUES } from '../../Models/Enums';

export default function List() {
  const recipes = useAppSelector((state) => state.listRecipes.list);
  const recipesTitle = useAppSelector((state) => state.listRecipes.listTitle);

  return (
    <div className={styles.listComponent}>
      <div className={styles.listContainer}>
        <h2>{recipesTitle}</h2>
        <ul>
          {recipes.map((recipe, inde) => (
            <li key={`${recipe.id}-${inde}`} data-testid={recipe.id}>
              <Card
                recipe={recipe}
                isListCard={true}
                maxDescriptionSize={110}
                key={recipe.id}
                border={BORDER_VALUES.HOVERABLE}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
