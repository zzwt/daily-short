// import { SearchOutlined } from '@ant-design/icons';

import React, { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StyledHeader } from './style';
import SearchBar from '../searchBar';
import {
  StarOutlined,
  UnorderedListOutlined,
  StockOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
export default memo(function Header() {
  const router = useRouter();

  const menuItemClass = (path, exact = true) => {
    if (exact) {
      return router.pathname === path ? 'menu-item active' : 'menu-item';
    }
    return router.pathname.startsWith(path) ? 'menu-item active' : 'menu-item';
  };
  return (
    <StyledHeader>
      <h2 className="header">Daily ASX Short Sales</h2>
      <div className="menu border-shadow">
        <Link href="/" data-test="item">
          <div className={menuItemClass('/')}>
            <UnorderedListOutlined />
            <a>Top Sale Today</a>
          </div>
          {/* </div> */}
        </Link>
        <Link href="/market" data-test="item">
          <div className={menuItemClass('/market')}>
            <BarChartOutlined />
            <a>Market</a>
          </div>
        </Link>
        <Link href="/searchstock" data-test="item">
          <div className={menuItemClass('/searchstock', false)}>
            <StockOutlined />
            <a> Stocks </a>
          </div>
        </Link>
        <Link href="/fav" data-test="item">
          <div className={menuItemClass('/fav')}>
            <StarOutlined />
            <a>My favourites</a>
          </div>
        </Link>
        <Link href="/about" data-test="item">
          <div className={menuItemClass('/about')}>
            <InfoCircleOutlined />
            <a>About</a>
          </div>
        </Link>
      </div>
      <SearchBar />
    </StyledHeader>
  );
});
