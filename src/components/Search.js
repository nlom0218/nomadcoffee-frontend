import { useReactiveVar } from '@apollo/client';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { searchVar, setPage } from '../apollo';

const Container = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  margin-left: 20px;

`

const SearchIcon = styled.div`
  font-size: 24px;
  margin-right: 10px;
`

const Form = styled.form`
  width: 100%;
  padding: 5px 10px;
  border: 2px solid ${props => props.theme.fontColor};
  border-radius: 15px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  font-size: 18px;
`

const Search = () => {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
    mode: "onChange"
  })
  const onValid = (data) => {
    setPage(1)
    history.push(`/ search / ${data.category} `)
  }
  return (<Container>
    <Form onSubmit={handleSubmit(onValid)}>
      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
      <Input
        {...register("category")}
        type="text"
        placeholder="카테고리를 입력하세요."
        autoComplete="off"
      />
    </Form>
  </Container>);
}

export default Search;