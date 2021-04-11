import React, { memo, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { numberWithCommas } from '../../../utils/helper';
import axios from 'axios';
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
import Message from '../../../components/message';

export default memo(function SearchStockByCode(props) {
  const [starred, setStarred] = useState(false);
  const router = useRouter();

  const { data: historyResponse, error: historyError } = useSWR(
    `/data/${router.query.code.toUpperCase()}`,
    {
      initialData: props,
    }
  );

  useEffect(() => {
    // setCurrentCode(router.query.code.toUpperCase());
    // searcyHistoryByCode(router.query.code.toUpperCase());

    if (codeInCookies(router.query.code.toUpperCase())) {
      setStarred(true);
    } else {
      setStarred(false);
    }
  }, [router.query.code.toUpperCase()]);

  const history = useMemo(() => {
    if (historyResponse && !historyResponse.error) {
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

  const codeInCookies = (code) => {
    const cookies = new Cookies();

    const tickers = cookies.get('t');
    // console.log('tickers in cookie', tickers.split(','), router.query);
    return tickers && tickers.findIndex((ticker) => ticker === code) !== -1;
  };

  if (historyError)
    return (
      <div className="message" data-test="error-fetching">
        <Message content="Error fethcing history data. Please try later..." />
      </div>
    );
  if (!historyResponse) {
    return (
      <div className="spinner" data-test="spinner">
        <Spinner />
      </div>
    );
  }
  if (historyResponse.error)
    return (
      <div className="message" data-test="invalid-code">
        <Message content={historyResponse.message} />
      </div>
    );

  const saveFav = (e) => {
    const cookies = new Cookies();
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
        <div className="title" data-test="title">
          <h3>
            {`${history[0].code} - ${history[0].desc}`}
            <span className="starred" onClick={saveFav} data-test="starred">
              {starred ? (
                <StarFilled style={{ color: '#f2c11f' }} />
              ) : (
                <StarOutlined data-test="outline" />
              )}
            </span>
          </h3>
        </div>

        <div className="chart" data-test="chart">
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

export async function getServerSideProps(ctx) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URI}/data/${ctx.query.code.toUpperCase()}`
  );

  return { props: response.data };
}
