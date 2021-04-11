import { mount } from 'enzyme';

import SearchBar from '../../../src/components/searchBar';
import { findTestWrapper } from '../../../src/utils/testHelper';
import useSWR from 'swr';
jest.mock('swr');
const mockPush = jest.fn();
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  push: mockPush,
  events: {
    on: (event, fn) => {},
  },
}));

const mockData = {
  codes: [
    {
      _id: '605dd72e01f0ec44e4681ca0',
      code: 'ABA',
      desc: 'AUSWIDE BANK LTD',
      __v: 0,
    },
    {
      _id: '605dd72e01f0ec44e4681ca1',
      code: 'ABB',
      desc: 'AUSSIE BROADBAND LIMITED',
      __v: 0,
    },
  ],
};

describe('SearchBar Component', () => {
  beforeEach(() => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: { codes: [] },
        error: null,
      };
    });
  });
  it('SearchBar Component should have an input', () => {
    const wrapper = mount(<SearchBar />);
    expect(wrapper.find('input').length).toBe(1);
  });
  it('Empty search key should return empty auto-suggest', () => {
    const wrapper = mount(<SearchBar />);
    expect(findTestWrapper(wrapper, 'suggest-item').length).toBe(0);
  });
  it('Valid search key should return correct auto-suggest', () => {
    const wrapper = mount(<SearchBar />);
    const inputElement = wrapper.find('input');

    useSWR.mockImplementationOnce(() => {
      return {
        data: mockData,
        error: null,
      };
    });
    inputElement.simulate('change', {
      target: { value: 'ab' },
    });
    inputElement.simulate('focus');
    expect(findTestWrapper(wrapper, 'suggest-item').length).toBe(
      mockData.codes.length
    );
  });
  it('Searching should show spinner', () => {
    const wrapper = mount(<SearchBar />);
    const inputElement = wrapper.find('input');

    useSWR.mockImplementationOnce(() => {
      return {
        data: null,
        error: null,
      };
    });
    inputElement.simulate('change', {
      target: { value: 'ab' },
    });
    inputElement.simulate('focus');
    expect(findTestWrapper(wrapper, 'spinner').length).toBe(1);
  });
  it('Click on autosuggest should jump to searchstock page', () => {
    const wrapper = mount(<SearchBar />);
    const inputElement = wrapper.find('input');

    useSWR.mockImplementationOnce(() => {
      return {
        data: mockData,
        error: null,
      };
    });
    inputElement.simulate('change', {
      target: { value: 'ab' },
    });
    inputElement.simulate('focus');
    const suggest1 = findTestWrapper(wrapper, 'suggest-item').at(0);
    useSWR.mockImplementationOnce(() => {
      return {
        data: mockData,
        error: null,
      };
    });
    suggest1.simulate('click', {});
    expect(mockPush).toHaveBeenCalledWith(
      `/searchstock/${mockData['codes'][0].code}`
    );
  });
});
