import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getEpisodeById } from '../../redux/episodes/asyncActions';
import styles from './Episode.module.css';
import { Character } from '../../components/Character';
import { getCharacters } from '../../redux/character/asyncActions';

export const EpisodePage: React.FC = () => {
  const { id } = useParams();
  const { currEpisode } = useAppSelector((state) => state.episodes);
  const { characters } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    id && dispatch(getEpisodeById(Number(id)));
  }, []);

  React.useEffect(() => {
    const listCharacterIds: string[] = [];

    currEpisode.characters.forEach((item) => {
      const splitUrl = item.split('/');
      const charactersIdInUrl = splitUrl[splitUrl.length - 1];
      listCharacterIds.push(charactersIdInUrl);
    });

    dispatch(getCharacters(listCharacterIds));
  }, [currEpisode]);

  console.log(characters);
  return (
    <div className={styles.root}>
      <h1>{currEpisode.name}</h1>
      <h2>{currEpisode.air_date}</h2>
      <div>
        <h2>List of characters</h2>
        {characters &&
          characters.map((item) => <Character key={item.id} {...item} />)}
      </div>
    </div>
  );
};
