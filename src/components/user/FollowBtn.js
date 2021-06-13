import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { setUser } from '../../apollo';
import useUser from '../../hooks/useUser';

const FOLLOW_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`
const UNFOLLOW_USER = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`

const SFollowBtn = styled.div`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.bgColor};
  width: 200px;
  text-align: center;
  padding: 10px 0px;
  font-size: 24px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`

const FollowBtn = ({ isMe, isFollow, username, id }) => {
  const user = useUser()
  const updataFollowUser = (cache, result) => {
    const { data: { followUser: { ok } } } = result
    if (!ok) {
      return
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollow(prev) { return !prev },
        totalFollow(prev) { return prev + 1 }
      }
    })
    cache.modify({
      id: `User:${user.id}`,
      fields: {
        totalFollowing(prev) { return prev + 1 }
      }
    })
  }
  const [followUser, { loading }] = useMutation(FOLLOW_USER, {
    variables: { username },
    update: updataFollowUser
  }
  )

  const updataUnfollowUser = (cache, result) => {
    const { data: { unfollowUser: { ok } } } = result
    if (!ok) {
      return
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollow(prev) { return !prev },
        totalFollow(prev) { return prev - 1 }
      }
    })
    cache.modify({
      id: `User:${user.id}`,
      fields: {
        totalFollowing(prev) { return prev - 1 }
      }
    })
  }
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: { username },
    update: updataUnfollowUser
  })

  const text = () => {
    if (isFollow) {
      return <div onClick={unfollowUser}>Following</div>
    } else {
      return <div onClick={followUser}>Follow</div>
    }
  }
  return (<SFollowBtn>
    {isMe ? <div onClick={() => setUser("edit")}>프로필 수정하기</div> : text()}
  </SFollowBtn>);
}

export default FollowBtn;