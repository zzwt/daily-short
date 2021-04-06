import React, { memo, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Message from '../../components/message';
import ShortList from '../../components/shortList';
import StyledFav from './style';
export default memo(function Fav() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const savedTickers = cookies.get('t') || [];
    setFavs(savedTickers.join(','));
  }, []);

  return (
    <StyledFav>
      {favs.length === 0 && (
        <div className="message">
          <Message content="You have no favourites yet. Please add first..."></Message>
        </div>
      )}
      {favs.length > 0 && (
        <ShortList endpoint="favs" cookie={favs} title="Starred" />
      )}
    </StyledFav>
  );
});
