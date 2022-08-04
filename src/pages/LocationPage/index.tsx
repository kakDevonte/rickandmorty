import React from 'react';
import { useParams } from 'react-router-dom';
import { Character } from '../../components/Character';
import { getCharacters } from '../../redux/character/asyncActions';
import { getLocationById } from '../../redux/location/asyncActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './LocationPage.module.css';
import { NotFoundBlock } from '../../components/NotFoundBlock';

export const LocationPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.character);
  const { location } = useAppSelector((state) => state.location);

  React.useEffect(() => {
    dispatch(getLocationById(Number(id)));
  }, []);

  React.useEffect(() => {
    const listCharacterIds: string[] = [];

    location &&
      location.residents.forEach((item) => {
        const splitUrl = item.split('/');
        const charactersIdInUrl = splitUrl[splitUrl.length - 1];
        listCharacterIds.push(charactersIdInUrl);
      });

    listCharacterIds.length && dispatch(getCharacters(listCharacterIds));
  }, [location]);

  if (!location)
    return (
      <>
        <NotFoundBlock />
      </>
    );

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <h1>Name - {location.name}</h1>
        <h2>Type - {location.type}</h2>
        <h2>Dimension - {location.dimension}</h2>
        <h3>List of characters</h3>
      </div>
      <div className={styles.characters}>
        {location.residents.length ? (
          characters.map((item) => <Character key={item.id} {...item} />)
        ) : (
          <NotFoundBlock />
        )}
      </div>
    </div>
  );
};
