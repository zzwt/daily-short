import React, { memo } from 'react';
import { StyledMessage } from './style.js';

export default memo(function Message({ content }) {
  return (
    <StyledMessage className="border-shadow">
      <h3>{content}</h3>
    </StyledMessage>
  );
});
