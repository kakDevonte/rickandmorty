import React from 'react';
import styles from './EpisodesPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodes } from '../../redux/episodes/asyncActions';
import { Episode } from '../../components/Episode';

export const EpisodesPage: React.FC = () => {
  const { results } = useAppSelector((state) => state.episodes.data);
  const dispatch = useAppDispatch();

  const regex = /(?<=S).*?(?=E)/;
  const regex2 = /(?<=E).*/;
  //const episode = regex2.exec();

  React.useEffect(() => {
    dispatch(getEpisodes(1));
  }, []);

  return (
    <div className={styles.root}>
      <ul>
        {results &&
          results.map((episode) => <Episode key={episode.id} {...episode} />)}
      </ul>
    </div>
  );
};
