import React, { memo } from 'react';
import { StyledFooter } from './style';

export default memo(function Footer() {
  return (
    <StyledFooter className="round-border">
      <p> Copyright &copy; 2019-2022</p>
      <p>
        <a href="mailto:support@dayshorts.com">Contact us</a>
      </p>
      <p>
        <a href="/about">About</a>
      </p>
    </StyledFooter>
  );
});
