import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { setIsSearching, setSearchParam } from '../../Redux/search';
import { setListRecipes } from '../../Redux/listSlice';
import { CgArrowRightO } from 'react-icons/cg';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { processQueryData } from '../../utils/processData';
import { useNavigate } from 'react-router-dom';

const params = {
  from: 0,
  size: 50,
  timezone: '-0400',
  vegeterian: false,
};
const headers = {
  'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
  'x-rapidapi-host': 'tasty.p.rapidapi.com',
};

export default function Layout() {
  const dispatch = useAppDispatch();
  const isSearching = useAppSelector((state) => state.search.isSearching);
  const searchParam = useAppSelector((state) => state.search.searchParam);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    console.log('handleSearchClick on Layout');
    axios
      .get(`https://tasty.p.rapidapi.com/feeds/list?q=${searchParam}`, {
        params,
        headers,
      })
      .then((res: AxiosResponse) => {
        const processedData = processQueryData(res);
        dispatch(
          setListRecipes({
            listTag: searchParam,
            list: processedData,
            listTitle: searchParam,
          })
        );
        dispatch(setIsSearching(false));
        navigate('/list');
      })
      .catch((e: AxiosError) => {
        console.log('Error trying to retrieve the carousel cards data: ', e);
        throw new Error(e.message);
      });
  };
  return (
    <div className={styles.layout}>
      <Header />

      {isSearching && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchParam}
            onChange={(e) => dispatch(setSearchParam(e.target.value))}
          />
          <button onClick={handleSearchClick}>
            <CgArrowRightO />
          </button>
        </div>
      )}

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
