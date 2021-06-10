import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import routes from '../routes';

const Profile = () => {
  const { username } = useParams()
  return (<>
    {username}의 프로필
    <Link to={routes.ADD}>커피숍만들기</Link>
  </>);
}

export default Profile;