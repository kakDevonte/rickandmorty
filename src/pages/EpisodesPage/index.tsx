import React from 'react';
import styles from './EpisodesPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodes } from '../../redux/episodes/asyncActions';
import { Episode } from '../../components/Episode';
import { Search } from '../../components/Search';

export const EpisodesPage: React.FC = () => {
  const { results, info } = useAppSelector((state) => state.episodes);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getEpisodes(page));
  }, [page]);

  return (
    <div>
      <div className={styles.search}>
        <Search />
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
