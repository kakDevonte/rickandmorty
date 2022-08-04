import React from 'react';
import { searchEpisodes } from '../../redux/episodes/asyncActions';
import { setSearchValue } from '../../redux/episodes/slise';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './Search.module.css';

export const Search: React.FC = () => {
    const { searchValue } = useAppSelector(state => state.episodes);
    const dispatch = useAppDispatch();

    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value));
    };

    const onClickSearchBtn = () => {
        if(searchValue) {
            dispatch(searchEpisodes({ page: 1, value: searchValue }));
        }
    };

    return(
        <div>
        <input className={styles.input} value={searchValue} onChange={onChangeSearchValue}/>
        <button className={styles.button} onClick={onClickSearchBtn}>Найти</button>
    </div>
    );
};