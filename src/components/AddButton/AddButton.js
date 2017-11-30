import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styled from 'styled-components';

const StyledButton = styled(FloatingActionButton)`
  position: fixed;
  bottom: 90px;
`;

const AddButton = ({ onAction }) => {
  return (
    <div className="d-flex justify-content-end">
      <StyledButton>
        <ContentAdd onClick={() => onAction()} />
      </StyledButton>
    </div>
  );
};

export default AddButton;
