import React from 'react';
import { NavLink } from 'react-router-dom';
import { CharacterType } from '../../redux/character/types';
import styles from './Character.module.css';

export const Character: React.FC<CharacterType> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={props.image} />
      </div>
      <div className={styles.name}>
        <NavLink to={`/character/${props.id}`}>
          <h3>{props.name}</h3>
        </NavLink>
      </div>
    </div>
  );
};
