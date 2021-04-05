import React, { memo, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import ShortList from '../../components/shortList';
import StyledFav from './style';
export default memo(function Fav() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const savedTickers = cookies.get('t');
    setFavs(savedTickers.join(','));
  }, []);

  return (
    <StyledFav>
      {favs.length === 0 && (
        <div>You have no favourites yet. Please add some first...</div>
      )}
      {favs.length > 0 && (
        <ShortList endpoint="favs" cookie={favs} title="Starred" />
      )}
    </StyledFav>
  );
});
