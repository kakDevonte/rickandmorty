import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';

export const CharacterPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    return <>
    </>
}