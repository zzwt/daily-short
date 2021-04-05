import { memo, useMemo } from 'react';
import { normalize, numberWithCommas } from '../../utils/helper';
import { useRouter } from 'next/router';

import PercentageBar from '../percentageBar';
import Spinner from '../spinner';
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
          onClick={(e) => {
            router.push(`/searchstock/${sdata.code}`);
          }}
        >
          <div className="ticker">{sdata.code}</div>
          <div className="name">{sdata.desc}</div>
          <div className="short-sale">{numberWithCommas(sdata.shortSale)}</div>
          <div className="percentage">
            {numberWithCommas(sdata.percentage)}%
          </div>
          <div className="percentage-bar">
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
    return <div>Error fethcing top shorts data. Please try later...</div>;
  if (!data)
    return (
      <div className="spinner">
        <Spinner></Spinner>
      </div>
    );

  return (
    <StyledShortList className="border-shadow">
      <div className="title">
        <h3> {`${title} `}</h3>
        <p className="date">
          {`Last Update: ${shortDate.getDate()}-${
            shortDate.getMonth() + 1
          }-${shortDate.getFullYear()}`}
        </p>
      </div>

      <div className="top-short">
        <div className="top-short-header">
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
