import React from 'react';
import styles from './NotFoundBlock.module.css';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing found :(</h1>
    </div>
  );
};