import { useReactiveVar } from '@apollo/client';
import { faAngleDoubleLeft, faAngleDoubleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { pageVar, setPage } from '../apollo';

const SPageControl = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  /* border: 1px solid ${props => props.theme.fontColor}; */
`

const PageNum = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
`

const Divide = styled.div`
  margin: 0px 10px;
`

const MoveIcon = styled.div`
  display: flex;
  align-items: center;
  svg{
    cursor: pointer;
  }
`

const FirstPage = styled.div`
  margin-right: 10px;
  font-size: 24px;
`

const BeforePage = styled.div`
  font-size: 20px;
  `

const NextPage = styled.div`
  margin-right: 10px;
  font-size: 20px;

`

const LastPage = styled.div`
    font-size: 24px;
`

const PageControl = ({ totalShops }) => {
  const page = useReactiveVar(pageVar)
  const pageNum = Math.ceil(totalShops / 6)
  let pageArr = []
  for (let i = 0; i < pageNum; i++) {
    pageArr.push(i + 1)
  }

  const onClickBefore = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1)
  }
  const onClickNext = () => {
    if (page === pageNum) {
      return
    }
    setPage(page + 1)
  }
  return (<SPageControl>
    <MoveIcon>
      <FirstPage><FontAwesomeIcon onClick={() => setPage(1)} icon={faAngleDoubleLeft} /></FirstPage>
      <BeforePage><FontAwesomeIcon onClick={onClickBefore} icon={faChevronLeft} /></BeforePage>
    </MoveIcon>
    <PageNum>
      <span>{page}</span>
      <Divide>/</Divide>
      <span>{pageNum}</span>
    </PageNum>
    <MoveIcon>
      <NextPage><FontAwesomeIcon onClick={onClickNext} icon={faChevronRight} /></NextPage>
      <LastPage><FontAwesomeIcon onClick={() => setPage(pageNum)} icon={faAngleDoubleRight} /></LastPage>
    </MoveIcon>
  </SPageControl>);
}

export default PageControl;