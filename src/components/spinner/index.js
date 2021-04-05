import React, { memo } from 'react';
import { StyledSpinner } from './style.js';

import SpinnerImg from '../../../public/spinner.gif';

export default memo(function Spinner() {
  return (
    <StyledSpinner>
      <img src={SpinnerImg} />
    </StyledSpinner>
  );
});
