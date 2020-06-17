import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import TextInput from '../common/TextInput';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  > :not(:first-child) {
      /* margin-left: 20px; */
  }
`;

function TextAndButton({ className, inputProps, buttonProps }) {

    return (
        <Container className={ className }>
            <TextInput { ...inputProps } />
            <Button { ...buttonProps } />
        </Container>
    );
}

export default TextAndButton;
