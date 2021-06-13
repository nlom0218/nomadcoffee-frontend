import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import FollowBtn from './FollowBtn';
import InfoList from './InfoList';

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 50px;
  /* background-color: ${props => props.theme.boxColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  color: ${props => props.theme.bgColor};
  border-radius: 10px; */
  width: 100%;
`

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 60px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
  svg {
    margin-right: 60px;
    border-radius: 50%;
    font-size: 150px;
  }
`


const UserInfo = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
`

const AvatarSide = styled.div``

const SideNum = styled.div`
  display: flex;
  div {
    margin-right: 20px;
    font-size: 22px;
  }
`

const BasicInfo = ({ data }) => {
  const { seeProfile: { id, username, email, name, avatarURL, githubUsername, isMe, totalCafe, isFollow, totalFollow
    , totalFollowing } } = data

  return (<Container>
    <UserAvatar>
      {avatarURL ? <img src={avatarURL} /> : <FontAwesomeIcon icon={faCoffee} />}
      <AvatarSide>
        <FollowBtn isMe={isMe} isFollow={isFollow} username={username} id={id} />
        <SideNum>
          <div>카페: {totalCafe}</div>
          <div>팔로워: {totalFollow}</div>
          <div>팔로잉: {totalFollowing}</div>
        </SideNum>
      </AvatarSide>
    </UserAvatar>
    <UserInfo>
      <InfoList info={username} list="Username" />
      <InfoList info={email} list="Email" />
      {name && <InfoList info={name} list="Name" />}
      {githubUsername && <InfoList info={githubUsername} list="GithubUsername" link={true} />}
    </UserInfo>
  </Container>);
}

export default BasicInfo;