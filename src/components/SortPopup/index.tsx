import React from 'react';
import { setSort } from '../../redux/episodes/slise';
import {SortItem, SortPropertyEnum } from '../../redux/episodes/types';
import {useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './SortPopup.module.css';

const sortList: SortItem[] = [
    { name: 'title(DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
    { name: 'title(ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
    { name: 'date(DESC)', sortProperty: SortPropertyEnum.DATE_DESC },
    { name: 'date(ASC)', sortProperty: SortPropertyEnum.DATE_ASC },
]

export const SortPopup: React.FC = () => {
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const { sort } = useAppSelector(state => state.episodes);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !event.composedPath().includes(popupRef.current)
            ) {
                setIsVisible(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    const onClickPopup = () => {
        setIsVisible(!isVisible);
    };

    const onClickSelectedSort = (item: SortItem) => {
        dispatch(setSort(item));
        setIsVisible(false);
    };

    return (
        <div ref={popupRef}>
                <b>Sort by:</b>
                <span className={styles.sortLabel} onClick={onClickPopup}> {sort.name}</span>
            {isVisible && (
                <div className={styles.sortPopup}>
                    <ul>
                        {sortList.map((item, index) =>
                        <li key={index}
                            className={sort.sortProperty === item.sortProperty ? styles.active : ''}
                            onClick={() => onClickSelectedSort(item)}>
                            {item.name}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};