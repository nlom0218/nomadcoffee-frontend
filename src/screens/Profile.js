import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { setUser, userVar } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import Header from '../components/Header';
import ListContainer from '../components/ListContainer';
import ListName from '../components/ListName';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';
import BasicInfo from '../components/user/BasicInfo';
import DelUser from '../components/user/DelUser';
import EditUser from '../components/user/EditUser';
import UserAvatar from '../components/user/UserAvatar';
import UserCafe from '../components/user/UserCafe';
import UserLikes from '../components/user/UserLikes';
import routes from '../routes';
import CreateShop from './CreateShop';

const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      email
      name
      avatarURL
      githubUsername
      isMe
      totalCafe
      isFollow
      totalFollow
      totalFollowing
    }
  }
`

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px 0px 0px 20px;
`

const AddCafe = styled.div`
  font-size: 24px;
  color: ${props => props.theme.fontColor};
`


const Profile = () => {
  const { username } = useParams()
  const { data, loading } = useQuery(SEE_PROFILE, { variables: { username } })
  const userMode = useReactiveVar(userVar)
  return (loading ? <Loading /> : <>
    <PageTitle title={username} />
    <Header />
    <BasicContainer>
      <BasicHomeTitle title={`${username}'s Profile`} />
      <Container>
        <ListContainer>
          <ListName>
            <span onClick={() => { setUser("basic") }}>기본정보</span>
          </ListName>
          <ListName>
            <span onClick={() => { setUser("cafe") }}>{username}의 카페</span>
          </ListName>
          {/* <ListName>
            <span onClick={() => { setUser("likes") }}>{username}의 좋아요</span>
          </ListName> */}
          {data?.seeProfile?.isMe && <><ListName>
            <span onClick={() => { setUser("edit") }}>기본 정보 수정하기</span>
          </ListName>
            <ListName>
              <span onClick={() => { setUser("avatar") }}>프로필 사진 수정하기</span>
            </ListName>
            <ListName>
              <span onClick={() => { setUser("creation") }}>카페 만들기</span>
            </ListName>
            <ListName>
              <span onClick={() => { setUser("del") }}>계정 삭제하기</span>
            </ListName></>}
        </ListContainer>
        <div style={{ width: "100%" }}>
          {userMode === "basic" && <BasicInfo data={{ ...data }} />}
          {userMode === "cafe" && <UserCafe username={data?.seeProfile?.username} />}
          {/* {userMode === "likes" && <UserLikes />} */}
          {userMode === "edit" && <EditUser preData={{ ...data }} />}
          {userMode === "avatar" && <UserAvatar />}
          {userMode === "del" && <DelUser id={data?.seeProfile?.id} username={data?.seeProfile?.username} />}
          {userMode === "creation" && <CreateShop />}
        </div>
      </Container>
    </BasicContainer>
  </>);
}

export default Profile;