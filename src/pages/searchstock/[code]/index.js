import React, { memo, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { numberWithCommas } from '../../../utils/helper';

import useSWR from 'swr';
import Spinner from '../../../components/spinner';
import StyledSearchStockByCode from './style';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  Bar,
} from 'recharts';

const cookies = new Cookies();
const codeInCookies = (code) => {
  const tickers = cookies.get('t');
  // console.log('tickers in cookie', tickers.split(','), router.query);
  return tickers && tickers.findIndex((ticker) => ticker === code) !== -1;
};

export default memo(function SearchStockByCode() {
  const [starred, setStarred] = useState(false);
  const router = useRouter();

  const { data: historyResponse, error: historyError } = useSWR(
    `/data/${router.query.code.toUpperCase()}`
  );

  useEffect(() => {
    // setCurrentCode(router.query.code.toUpperCase());
    // searcyHistoryByCode(router.query.code.toUpperCase());
    if (codeInCookies(router.query.code.toUpperCase())) setStarred(true);
  }, []);

  const history = useMemo(() => {
    if (historyResponse) {
      return historyResponse.shortData.map((d) => {
        const date = new Date(d.shortDate);
        return {
          ...d,
          shortDate: `${date.getDate()}-${date.getMonth() + 1}`,
        };
      });
    }
    return [];
  }, [historyResponse]);

  if (historyError)
    return <div>Error fethcing history data. Please try later...</div>;
  if (!historyResponse)
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );

  const saveFav = (e) => {
    const currentCode = router.query.code;
    const existingTickers = cookies.get('t');
    if (starred) {
      //cancel
      cookies.set(
        't',
        existingTickers.filter((t) => t !== currentCode)
      );
    } else {
      if (existingTickers) {
        existingTickers.push(currentCode);

        cookies.set('t', existingTickers);
      } else cookies.set('t', [currentCode]);
    }
    setStarred(!starred);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="pct">
            <span>{`${payload[0].payload.code}: `}</span>
            <strong>{`${payload[0].payload.percentage}%`}</strong>
          </p>
          <p className="st">Short Sales / Total Sales</p>
          <p className="amount">{`${numberWithCommas(
            payload[0].payload.shortSale
          )} / ${numberWithCommas(payload[0].payload.capital)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <StyledSearchStockByCode className="border-shadow">
      <>
        {history.length > 0 && (
          <div className="title">
            <h3>
              {`${history[0].code} - ${history[0].desc}`}
              <span className="starred" onClick={saveFav}>
                {starred ? (
                  <StarFilled style={{ color: '#f2c11f' }} />
                ) : (
                  <StarOutlined />
                )}
              </span>
            </h3>
          </div>
        )}

        <div className="chart">
          <BarChart width={960} height={250} data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="shortDate"
              style={{
                fontSize: '0.8rem',
              }}
            />
            <YAxis
              style={{
                fontSize: '0.8rem',
              }}
            >
              <Label
                value="Percentage Shorted"
                position="insideLeft"
                angle={-90}
                dx={0}
                dy={82}
                style={{
                  fill: '#7e58d1',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              ></Label>
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" barSize={15} fill="#7e58d1" />
          </BarChart>
        </div>
      </>
    </StyledSearchStockByCode>
  );
});

export async function getServerSideProps(context) {
  return { props: {} };
}
