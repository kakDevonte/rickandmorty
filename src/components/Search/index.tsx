import React from 'react';
import styles from './Search.module.css';

export const Search: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const onClickSearchBtn = () => {

    };

    return(
        <div>
        <input className={styles.input} type="text" value={searchValue} onChange={onChangeSearchValue}/>
        <button className={styles.button} onClick={onClickSearchBtn}>Найти</button>
    </div>
    );
};