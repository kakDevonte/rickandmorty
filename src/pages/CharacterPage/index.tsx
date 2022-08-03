import React from 'react';
import {NavLink, useParams } from 'react-router-dom';
import { Episode } from '../../components/Episode';
import { getCharacterById } from '../../redux/character/asyncActions';
import { getEpisodesByArray } from '../../redux/episodes/asyncActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './CharacterPage.module.css';

export const CharacterPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { currCharacter } = useAppSelector(state => state.character);
    const { results } = useAppSelector(state => state.episodes);

    const [isVisibleEpisodes, setIsVisibleEpisodes] = React.useState(true);

    React.useEffect(() => {
        dispatch(getCharacterById(Number(id)));
    }, []);

    React.useEffect(() => {
        const listEpisodeIds: string[] = [];

        if(currCharacter) {
            currCharacter.episode.forEach((item) => {
                const splitUrl = item.split('/');
                const episodesIdInUrl = splitUrl[splitUrl.length - 1];
                listEpisodeIds.push(episodesIdInUrl);
            });

            dispatch(getEpisodesByArray(listEpisodeIds));
        }

    }, [currCharacter]);

    if(!currCharacter) return <></>

    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={currCharacter.image} />
            </div>
            <div className={styles.name}>
                <h2>{currCharacter.name}</h2>
            </div>
            <div className={styles.episodes}>
                <h2 onClick={() => setIsVisibleEpisodes(!isVisibleEpisodes)}>Episodes</h2>
                {isVisibleEpisodes && <div>
                    {results &&
                    results.map((season) => (
                        <div key={season.number}>
                            <h3>Season {season.number}</h3>
                            <ul className={styles.seasonList}>
                                {season.episodes.map((episode) => (
                                    <Episode key={episode.id} {...episode} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>}
            </div>
            <div className={styles.locations}>
                <NavLink to={`/location/${currCharacter.id}`}><h2>Locations: {currCharacter.location.name}</h2></NavLink>

            </div>
        </div>
    );
};