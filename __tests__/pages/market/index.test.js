import { shallow } from 'enzyme';
import MarketPage from '../../../src/pages/market';
import { findTestWrapper } from '../../../src/utils/testHelper';
import useSWR from 'swr';
jest.mock('swr');

describe('Market Page', () => {
  beforeEach(() => {
    useSWR.mockClear();
  });
  it('Error fetching data should show Error message', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: null,
        error: true,
      };
    });
    const wrapper = shallow(<MarketPage />);
    expect(findTestWrapper(wrapper, 'error').length).toBe(1);
  });
  it('Loading should show spinner', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: null,
        error: null,
      };
    });
    const wrapper = shallow(<MarketPage />);
    expect(findTestWrapper(wrapper, 'spinner').length).toBe(1);
  });

  it('With sector data should display treemap', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: { date: { lastUpdate: '2021-04-08T00:00:00.000Z' } },
        error: null,
      };
    });
    const wrapper = shallow(<MarketPage />);
    expect(findTestWrapper(wrapper, 'chart').length).toBe(1);
  });
});
