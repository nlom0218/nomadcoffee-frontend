import React from 'react';
import styled from 'styled-components';

const SCreateShopLayout = styled.div`
  width: 700px;
  max-width: 700px;
  /* margin-top: 30px; */
`

const CreateShopLayout = ({ children }) => {
  return (<SCreateShopLayout>
    {children}
  </SCreateShopLayout>);
}

export default CreateShopLayout;