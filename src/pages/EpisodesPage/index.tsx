import React from 'react';
import styles from './EpisodesPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodes, searchEpisodes } from '../../redux/episodes/asyncActions';
import { Episode } from '../../components/Episode';
import { Search } from '../../components/Search';
import { SortPopup } from '../../components/SortPopup';

export const EpisodesPage: React.FC = () => {
  const { results, info, searchValue } = useAppSelector((state) => state.episodes);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if(searchValue) {
      dispatch(searchEpisodes({ page, value: searchValue }));
    }
    else {
      dispatch(getEpisodes(page));
    }
  }, [page]);

  React.useEffect(() => {
    setPage(1);
  }, [searchValue]);

  return (
    <div>
      <div className={styles.search}>
        <Search />
        <SortPopup />
      </div>
      {results &&
        results.map((season) => (
          <div className={styles.root} key={season.number}>
            <h2>Season {season.number}</h2>
            <ul className={styles.seasonList}>
              {season.episodes.map((episode) => (
                <Episode key={episode.id} {...episode} />
              ))}
            </ul>
          </div>
        ))}
      {info.pages > 1 && <div className={styles.pagination}>
        <button
            className={styles.button}
            disabled={!info.prev}
            onClick={() => setPage(page - 1)}
        >
          Назад
        </button>
        <button
            className={styles.button}
            disabled={!info.next}
            onClick={() => setPage(page + 1)}
        >
          Вперед
        </button>
      </div>}
    </div>
  );
};
