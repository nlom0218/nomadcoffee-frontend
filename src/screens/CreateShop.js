import { useMutation } from '@apollo/client';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormLayout from '../components/coffeeShop/FormLayout';
import InfoCreate from '../components/creation/InfoCreate';
import PhotoCreate from '../components/creation/PhotoCreate';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { Button, Input } from '../components/style';
import routes from '../routes';

const ShopLayout = styled.div`
  width: 600px;
  max-width: 600px;
  margin-top: 30px;
`

const Title = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`

const CreateForm = styled(FormLayout)`
  width: 100%;
`

const CreateShop = () => {
  const [photo, setPhoto] = useState(false)
  const [shopId, setShopId] = useState(null)

  return (
    <>
      <Header />
      <ShopLayout>
        <PageTitle title="만들기" />
        <Title>카페 만들기</Title>
        <CreateForm>
          {!photo ?
            <InfoCreate setPhoto={setPhoto} setShopId={setShopId} />
            :
            <PhotoCreate shopId={shopId} />
          }
        </CreateForm>
      </ShopLayout>
    </>);
}

export default CreateShop;