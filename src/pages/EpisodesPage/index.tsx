import React from 'react';
import styles from './EpisodesPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodes, searchEpisodes } from '../../redux/episodes/asyncActions';
import {
  Episode,
  Search,
  SortPopup,
  NotFoundBlock
} from '../../components/';

export const EpisodesPage: React.FC = () => {
  const { results, info, searchValue } = useAppSelector(
    (state) => state.episodes
  );
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (searchValue) {
      dispatch(searchEpisodes({ page, value: searchValue }));
    } else {
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
      {results.length ? (
        results.map((season) => (
          <div className={styles.root} key={season.number}>
            <h2>Season {season.number}</h2>
            <ul className={styles.seasonList}>
              {season.episodes.map((episode) => (
                <Episode key={episode.id} {...episode} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <NotFoundBlock />
      )}
      {info.pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.button}
            disabled={!info.prev}
            onClick={() => setPage(page - 1)}
          >
            Back
          </button>
          <button
            className={styles.button}
            disabled={!info.next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
