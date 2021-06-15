import { useQuery } from '@apollo/client';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { setPage } from '../apollo';

const Container = styled.div`
  width: 400px;
  display: flex;
  align-items: flex-end;
  margin-left: 20px;
`

const SearchIcon = styled.div`
  font-size: 24px;
  margin-right: 20px;
  svg {
    cursor: pointer;
  }
`

const Form = styled.form`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding-left: 10px;
  border-bottom: 1px solid ${props => props.theme.fontColor};
`

const Search = () => {
  const history = useHistory()
  const [search, setSearch] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    mode: "onChange"
  })
  const onClickSearch = () => {
    if (search) {
      setSearch(false)
    } else {
      setSearch(true)
    }
  }
  const onValid = (data) => {
    setPage(1)
    history.push(`/search/${data.category}`)
  }

  return (<Container>
    <SearchIcon>
      <FontAwesomeIcon icon={faSearch} onClick={onClickSearch} />
    </SearchIcon>
    { search ?
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("category")}
          type="text"
          placeholder="카테고리를 입력하세요."
        />
      </Form> : null
    }
  </Container>);
}

export default Search;