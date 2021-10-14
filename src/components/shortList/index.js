import { memo, useMemo } from 'react';
import { normalize, numberWithCommas } from '../../utils/helper';
import { useRouter } from 'next/router';

import PercentageBar from '../percentageBar';
import Spinner from '../spinner';
import Message from '../message';
import { StyledShortList } from './style';
import useSWR from 'swr';
export default memo(function ShortList({ endpoint, cookie, title = '' }) {
  const { data, error } = useSWR([`/${endpoint}`, cookie ? cookie : null]);

  const [shortDate, shortData] = useMemo(() => {
    if (data && data.date && data.shorts) {
      const date = new Date(data.date.lastUpdate);
      const scaler = normalize(0, data.shorts[0].percentage);
      const result = data.shorts.map((short) => {
        return {
          ...short,
          widthRatio: scaler(short.percentage),
        };
      });
      return [date, result];
    }
    return [null, null];
  }, [data]);

  const router = useRouter();

  const renderData = () => {
    return shortData.map((sdata) => {
      return (
        <div
          key={sdata._id}
          className="top-short-data-item"
          data-test="data-item"
          onClick={(e) => {
            router.push(`/searchstock/${sdata.code}`);
          }}
        >
          <div className="ticker" data-test="ticker">
            {sdata.code}
          </div>
          <div className="name" data-test="name">
            {sdata.desc}
          </div>
          <div className="short-sale" data-test="short-sale">
            {numberWithCommas(sdata.shortSale)}
          </div>
          <div className="percentage" data-test="percentage">
            {numberWithCommas(sdata.percentage)}%
          </div>
          <div className="percentage-bar" data-test="percentage-bar">
            <PercentageBar
              percentageValue={sdata.percentage}
              widthRatio={sdata.widthRatio}
            ></PercentageBar>
          </div>
        </div>
      );
    });
  };

  if (error)
    return (
      <div className="message" data-test="error">
        <Message content="Error fethcing top shorts data. Please try later..."></Message>
      </div>
    );
  if (!data)
    return (
      <div className="spinner" data-test="loading">
        <Spinner></Spinner>
      </div>
    );

  return (
    <StyledShortList className="round-border">
      <div className="title">
        <h3 data-test="title"> {`${title} `}</h3>
        <p className="date" data-test="endofday">
          {`End of Day: ${shortDate.getDate()}-${
            shortDate.getMonth() + 1
          }-${shortDate.getFullYear()}`}
        </p>
      </div>

      <div className="top-short">
        <div className="top-short-header" data-test="header">
          <div className="ticker">Ticker</div>
          <div className="name">Name</div>
          <div className="short-sale">Short Sale</div>
          <div className="percentage">pct</div>
          <div className="percentage-bar"></div>
        </div>
        <div className="top-short-data">{renderData()}</div>
      </div>
    </StyledShortList>
  );
});
