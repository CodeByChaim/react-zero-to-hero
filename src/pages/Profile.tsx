import React from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const capitalized = (input: string | undefined): string => {
    return !input ? '' : input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <div>
      <h1>Profile </h1>
      <p>Viewing profile of user ID: {capitalized(id)}</p>
    </div>
  );
};

export default Profile;
