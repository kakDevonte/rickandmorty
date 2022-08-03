import React from 'react';
import { CharacterType } from '../../redux/character/types';

export const Character: React.FC<CharacterType> = (props) => {
  return (
    <div>
      <div>
        <img src={props.image} />
      </div>
      <div className="Name and status">
        <span>
          <span>{props.name}</span>
        </span>
      </div>
      <div className="last location"></div>
      <div className="first seen"></div>
    </div>
  );
};
