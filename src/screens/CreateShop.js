import React, { useState } from 'react';
import styled from 'styled-components';
import BasicHomeTitle from '../components/BasicHomeTitle';
import CreateShopLayout from '../components/coffeeShop/CreateShopLayout';
import FormLayout from '../components/coffeeShop/FormLayout';
import InfoCreate from '../components/creation/InfoCreate';
import PhotoCreate from '../components/creation/PhotoCreate';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';

const CreateForm = styled(FormLayout)`
  width: 100%;
`

const CreateShop = () => {
  const [photo, setPhoto] = useState(false)
  const [shopId, setShopId] = useState(null)

  return (
    <>
      <CreateShopLayout>
        <PageTitle title="만들기" />
        <CreateForm>
          {!photo ?
            <InfoCreate setPhoto={setPhoto} setShopId={setShopId} />
            :
            <PhotoCreate shopId={shopId} />
          }
        </CreateForm>
      </CreateShopLayout>
    </>);
}

export default CreateShop;