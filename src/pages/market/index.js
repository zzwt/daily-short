import React, { memo, useState, useEffect } from 'react';
import useSWR from 'swr';

import { StyledMarket } from './style';

import { ResponsiveTreeMap } from '@nivo/treemap';
import Spinner from '../../components/spinner';

export default memo(function SearchStock() {
  const { data: sectorShorts, error: sectorError } = useSWR('/sectorshorts');

  const labelDisplay = (node) => {
    return `${node.id}: ${node.formattedValue}`;
  };

  if (sectorError)
    return <div>Error fethcing sector shorts. Please try later...</div>;
  if (!sectorShorts)
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  const date = new Date(sectorShorts.date.lastUpdate);
  return (
    <StyledMarket className="border-shadow">
      <p className="date">
        {`Last Update: ${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`}
      </p>

      <div className="sector-shorts">
        <ResponsiveTreeMap
          data={sectorShorts.shorts}
          identity="name"
          value="percentage"
          valueFormat=".02f"
          // margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          nodeOpacity={0.6}
          colors={{ scheme: 'nivo' }}
          labelSkipSize={15}
          label={labelDisplay}
          labelTextColor="#363636"
          // parentLabel={parentLabelDisplay}
          // labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
          parentLabelTextColor="#363636"
          // borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
          theme={{ fontSize: '9', fontWeight: 600 }}
        />
      </div>
    </StyledMarket>
  );
});

// export async function getServerSideProps(context) {
//   return { props: {} };
// }
