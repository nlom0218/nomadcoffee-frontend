import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

const Profile = () => {
  const { username } = useParams()
  return (<>
    <Header />
    <PageTitle title={username} />
    {username}의 프로필
    <Link to={routes.ADD}>커피숍만들기</Link>
  </>);
}

export default Profile;