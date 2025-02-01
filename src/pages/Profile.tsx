import React from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Profile </h1>
      <p>Viewing profile of user ID: {id}</p>
    </div>
  );
};

export default Profile;
