import React from 'react';
import styles from './EpisodesPage.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getEpisodes} from "../../redux/episodes/asyncActions";

export const EpisodesPage: React.FC = () => {
    const { results } = useAppSelector(state => state.episodes.data)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getEpisodes(1))
    }, [])
    return <div className={styles.root}>
        <ul>
            {results && results.map(episode =>
                <li key={episode.id}>
                    {episode.name}
                </li>)}
        </ul>
    </div>
}