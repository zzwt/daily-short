import { StyledIndex } from './style';
// import Autosuggest from 'react-autosuggest';

import { memo } from 'react';

import ShortList from '../components/shortList';

export default memo(function Index() {
  return (
    <StyledIndex>
      <ShortList endpoint="topshorts" title="Top Short Sales"></ShortList>
    </StyledIndex>
  );
});
