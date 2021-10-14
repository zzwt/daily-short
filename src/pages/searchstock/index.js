import React, { memo } from 'react';
import StyledSearchStock from './style';
import Message from '../../components/message'
export default memo(function SearchStock() {
  return (   
    <StyledSearchStock data-test="msg">
      <Message content=" Please Type ASX Code in Search Box Above"  /> 
    </StyledSearchStock>
  );
});
