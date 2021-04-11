import { shallow } from 'enzyme';
import ShortList from '../../../src/components/shortList';
import { findTestWrapper } from '../../../src/utils/testHelper';
import useSWR from 'swr';
jest.mock('swr');
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const mockPush = jest.fn();
useRouter.mockImplementation(() => {
  return {
    push: mockPush,
  };
});

const mockData = {
  date: { lastUpdate: '2021-04-08T00:00:00.000Z' },
  shorts: [
    {
      shortDate: '2021-04-08T00:00:00.000Z',
      _id: '606fa84d2c7e5000082bffcf',
      code: 'RSG',
      desc: 'RESOLUTE MINING LIMITED',
      product: 'FPO',
      shortSale: 5419409,
      capital: 1103892706,
      percentage: 0.49,
      __v: 0,
    },
    {
      shortDate: '2021-04-08T00:00:00.000Z',
      _id: '606fa84d2c7e5000082bfefe',
      code: 'KGN',
      desc: 'KOGAN.COM LTD',
      product: 'FPO',
      shortSale: 443606,
      capital: 106390981,
      percentage: 0.41,
      __v: 0,
    },
  ],
};

describe('ShortList Component', () => {
  describe('When data fetching failed', () => {
    it('Show Error Message', () => {
      useSWR.mockImplementationOnce(() => {
        return {
          data: null,
          error: {
            error: 'true',
          },
        };
      });
      const wrapper = shallow(
        <ShortList endpoint="sectorshorts" cookie={null} />
      );
      expect(findTestWrapper(wrapper, 'error')).toHaveLength(1);
    });
  });

  describe('When data is loading', () => {
    it('Show loading spinner', () => {
      useSWR.mockImplementationOnce(() => {
        return {
          data: null,
          error: null,
        };
      });

      const wrapper = shallow(<ShortList />);
      expect(findTestWrapper(wrapper, 'loading')).toHaveLength(1);
    });
  });

  describe('When data fetching successful', () => {
    beforeEach(() => {
      useSWR.mockImplementationOnce(() => {
        return {
          data: mockData,
          error: null,
        };
      });
    });
    it('ShortList Component should have a title', () => {
      const wrapper = shallow(<ShortList />);
      expect(findTestWrapper(wrapper, 'title')).toHaveLength(1);
    });

    it('ShortList Component should have an End of Day', () => {
      const wrapper = shallow(<ShortList />);
      expect(findTestWrapper(wrapper, 'endofday')).toHaveLength(1);
    });
    it('ShortList Component should have list header', () => {
      const wrapper = shallow(<ShortList />);
      expect(findTestWrapper(wrapper, 'header')).toHaveLength(1);
      expect(findTestWrapper(wrapper, 'header').children().length).toBe(5);
    });
    it('ShortList Component should have display data correctly', () => {
      const wrapper = shallow(<ShortList />);
      const line1 = findTestWrapper(wrapper, 'data-item').at(0);
      expect(line1.find('.ticker').text()).toEqual(mockData.shorts[0].code);
      expect(line1.find('.name').text()).toEqual(mockData.shorts[0].desc);
      expect(line1.find('.short-sale').text()).toEqual('5,419,409');
      expect(line1.find('.percentage').text()).toEqual('0.49%');
      expect(line1.find('.percentage-bar').length).toBe(1);
      expect(findTestWrapper(wrapper, 'data-item').length).toBe(2);
    });

    it('Click on list item will change to searchstock page', () => {
      const wrapper = shallow(<ShortList />);
      const line1 = findTestWrapper(wrapper, 'data-item').at(0);
      line1.simulate('click', {});
      expect(mockPush).toHaveBeenCalledWith(
        `/searchstock/${mockData.shorts[0].code}`
      );
    });
  });
});
