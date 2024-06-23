import { Tag as TagModel } from '../../Models/Tag';
import Frame from '../Frame/Frame';
import styles from './Tag.module.scss';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useAppDispatch } from '../../Redux/hooks';
import { setListRecipes } from '../../Redux/listSlice';
import { processListData } from '../../utils/processData';
import { useNavigate } from 'react-router-dom';

export default function Tag({ name, displayName }: TagModel) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTagClick = () => {
    console.log('handleTagClick called with name: ', name);
    const params = {
      from: 0,
      size: 100,
      tags: name,
    };
    const headers = {
      'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
    };
    axios
      .get('https://tasty.p.rapidapi.com/recipes/list', { params, headers })
      .then((res: AxiosResponse) => {
        const recipeProcessedData = processListData(res);
        console.log(recipeProcessedData);
        dispatch(
          setListRecipes({
            listTag: name,
            list: recipeProcessedData,
            listTitle: displayName,
          })
        );
        // Go to List Screen
        navigate('/list');
      })
      .catch((e: AxiosError) => {
        console.log('Error trying to retrieve the carousel cards data: ', e);
        throw new Error(e.message);
      });
  };
  return (
    <Frame isHoverable={true}>
      <button className={styles.tag} onClick={handleTagClick}>
        {displayName}
      </button>
    </Frame>
  );
}
