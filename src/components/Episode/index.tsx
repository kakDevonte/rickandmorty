import React from 'react';
import styles from './Episode.module.css';

type EpisodeProps = {
  name: string;
  air_date: string;
  episode: string;
};

export const Episode: React.FC<EpisodeProps> = (props) => {
  const regex = /(?<=E).*/;

  return (
    <>
      <li className={styles.root}>
        <span className={styles.episode}>
          Episode {regex.exec(props.episode)}
        </span>
        <span className={styles.name}>{props.name}</span>
        <span className={styles.date}>{props.air_date}</span>
      </li>
    </>
  );
};
