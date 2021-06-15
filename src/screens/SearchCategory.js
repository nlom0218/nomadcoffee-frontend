import { gql, useQuery, useReactiveVar } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pageVar } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import BasicHomeTitle from '../components/BasicHomeTitle';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageControl from '../components/pageControl';

const SEARCH_CATEGORY = gql`
  query searchCategory($category: String!, $page:Int!) {
    searchCategory(category: $category, page: $page) {
      coffeeShops{
        id
        name
        photos {
          url
          rep
        }
      }
      totalShops
    }
  }
`

const TitleAndPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const CoffeeShops = styled.div`
  display: grid;
  width: 100%;
  min-width: 1200px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 40px 30px;
  
`

const CoffeeShop = styled.div`
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.boxShadowColor};
  box-shadow: 7px 7px 0px 1px ${props => props.theme.boxShadowColor};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const ShopPhoto = styled.img`
  width: 100%;
  min-width: 390px;
  height: 300px;
`

const ShopName = styled.span`
  padding: 10px 0px 10px 20px ;
`

const SearchCategory = () => {
  const { category: category } = useParams()
  const page = useReactiveVar(pageVar)
  const { data, loading } = useQuery(SEARCH_CATEGORY, {
    variables: {
      page,
      category
    }
  })
  const findRepPhoto = (item) => {
    const photo = item.photos.find(photo => photo.rep === true)
    if (photo) {
      return photo.url
    }
    return null
  }
  return (<>
    <Header />
    <BasicContainer>
      {loading ? <Loading /> :
        <>
          <TitleAndPage>
            <BasicHomeTitle title={`Search: ${category}`} />
            <PageControl totalShops={data?.searchCategory?.totalShops} />
          </TitleAndPage>
          <CoffeeShops>
            {data?.searchCategory?.coffeeShops.map((item, index) => <Link key={index} to={`/shop/${item.id}`}>
              <CoffeeShop>
                <ShopPhoto src={findRepPhoto(item) || item.photos[0].url} />
                <ShopName>{item.name}</ShopName>
              </CoffeeShop></Link>)}
          </CoffeeShops>
        </>}
    </BasicContainer>
  </>);
}

export default SearchCategory;