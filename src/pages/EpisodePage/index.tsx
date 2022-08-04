import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodeById } from '../../redux/episodes/asyncActions';
import { Character, NotFoundBlock } from '../../components';
import { getCharacters } from '../../redux/character/asyncActions';
import styles from './Episode.module.css';

export const EpisodePage: React.FC = () => {
  const { id } = useParams();
  const { currEpisode } = useAppSelector((state) => state.episodes);
  const { characters } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    Number(id) && dispatch(getEpisodeById(Number(id)));
  }, []);

  React.useEffect(() => {
    const listCharacterIds: string[] = [];

    currEpisode &&
      currEpisode.characters.forEach((item) => {
        const splitUrl = item.split('/');
        const charactersIdInUrl = splitUrl[splitUrl.length - 1];
        listCharacterIds.push(charactersIdInUrl);
      });

    listCharacterIds.length && dispatch(getCharacters(listCharacterIds));
  }, [currEpisode]);

  if (!currEpisode)
    return (
      <>
        <NotFoundBlock />
      </>
    );

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h1>{currEpisode.name}</h1>
        <h2>{currEpisode.air_date}</h2>
        <h2>List of characters</h2>
      </div>
      <div className={styles.characters}>
        {characters &&
          characters.map((item) => <Character key={item.id} {...item} />)}
      </div>
    </div>
  );
};
