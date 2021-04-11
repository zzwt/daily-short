import React, { memo, useState, useEffect } from 'react';
import { StyledSearchBar } from './style.js';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import Autosuggest from 'react-autosuggest';
import { SearchOutlined } from '@ant-design/icons';
import Spinner from '../../components/spinner';
import { useRouter } from 'next/router';
const renderSuggestion = (suggestion) => (
  <div className="suggest-item" data-test="suggest-item">
    <div className="code">{suggestion.code}</div>
    <div className="desc">{suggestion.desc}</div>
  </div>
);

const getSuggestionValue = (suggestion) => suggestion.code;

export default memo(function SearchBar() {
  const [searchCode, setSearchCode] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // const [suggestions, setSuggestions] = useState([]);
  const { data, error } = useSWR(
    searchCode.length > 0 ? `/codes/${searchCode}` : null
  );

  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
    };
    const handleComplete = (url) => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const onChange = (event, { newValue }) => {
    setSearchCode(newValue);
  };

  const inputProps = {
    placeholder: 'Enter ASX Code',
    value: searchCode,
    onChange: onChange,
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = async ({ value }) => {
    mutate(`/codes/${value}`);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    // setSuggestions([]);
  };

  const onSuggestionSelected = async (event, { suggestion }) => {
    router.push(`/searchstock/${suggestion.code}`);
    setSearchCode('');

    // searcyHistoryByCode(suggestion.code);
    // setCurrentCode(suggestion.code);
    // setSearchCode('');
    // if (codeInCookies(suggestion.code)) setStarred(true);
    // else setStarred(false);
  };
  return (
    <StyledSearchBar>
      <div className="search-bar border-shadow">
        <Autosuggest
          // suggestions={suggestions}
          suggestions={data ? data.codes : []}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className="icon">
          <SearchOutlined />
        </div>
        {!data && searchCode.length > 0 && (
          <div className="spinner" data-test="spinner">
            <Spinner />
          </div>
        )}
        {error && (
          <div className="error">Error fetching codes. Please try later...</div>
        )}
      </div>
      {loading && (
        <div className="switch_page_spinner">
          <Spinner />
        </div>
      )}
    </StyledSearchBar>
  );
});
