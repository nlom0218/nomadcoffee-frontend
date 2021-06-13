import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as SolidHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const TOGGLE_SHOP_LIKE = gql`
  mutation toggleShopLike($shopId: Int!) {
    toggleShopLike(shopId: $shopId) {
      ok
      error
    }
  }
`

const SLikesBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: tomato;
  svg {
    font-size: 30px;
    cursor: pointer;
  }
`

const LikeNum = styled.div`
  margin-left: 10px;
  font-size: 24px;
  font-weight: 400;
`

const LikesBtn = ({ isLiked, likes, id }) => {
  const updataToggleShopLike = (cache, result) => {
    const { data: { toggleShopLike: { ok } } } = result
    if (ok) {
      const CoffeeShop = `CoffeeShop:${id}`
      cache.modify({
        id: CoffeeShop,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            } else {
              return prev + 1
            }
          }
        }
      })
    }
  }

  const [toggleShopLike, { loading }] = useMutation(TOGGLE_SHOP_LIKE, {
    variables: { shopId: id },
    update: updataToggleShopLike
  })
  return (<SLikesBtn>
    <FontAwesomeIcon icon={isLiked ? faHeart : SolidHeart} onClick={toggleShopLike} />
    <LikeNum>{likes === 1 ? `${likes}like` : `${likes}likes`}</LikeNum>
  </SLikesBtn>);
}

export default LikesBtn;