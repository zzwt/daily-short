import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledPercentageBar } from './style';
// import { SearchOutlined } from '@ant-design/icons';

import React, { memo } from 'react';

export default memo(function PercentageBar({ percentageValue, widthRatio }) {
  return (
    <StyledPercentageBar
      widthRatio={widthRatio}
      percentageValue={percentageValue}
    >
      <div className="bar" data-test="bar"></div>
      {/* <div className="title">{percentageValue}%</div> */}
    </StyledPercentageBar>
  );
});
