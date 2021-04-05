import React, { memo } from 'react';
import { StyledSearchStock } from './style';
export default memo(function SearchStock() {
  return (
    <StyledSearchStock className="border-shadow">
      {/* <div className="border-shadow"> */}
      Please Type ASX Code in Search Box Above
      {/* </div> */}
    </StyledSearchStock>
  );
});
