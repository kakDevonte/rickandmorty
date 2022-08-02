import React from 'react';

type EpisodeProps = {
  name: string;
  air_date: string;
  episode: string;
};

export const Episode: React.FC<EpisodeProps> = (props) => {
  return (
    <>
      <li>{`${props.name} ${props.air_date} ${props.episode}`}</li>
    </>
  );
};
