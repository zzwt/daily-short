import { shallow, mount } from 'enzyme';
import SearchIndividualStock from '../../../../src/pages/searchstock/[code]';
import { findTestWrapper } from '../../../../src/utils/testHelper';
import Cookies from 'universal-cookie';
import useSWR from 'swr';
import { StarOutlined, StarFilled } from '@ant-design/icons';
jest.mock('swr');
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  query: { code: 'sdfsdfsdf' },
}));

const mockGetCookie = jest.fn((code) => {
  return ['KGN', 'AMS'];
});
const mockSetCookie = jest.fn();

jest.mock('universal-cookie');

const mockDataAMS = {
  error: 0,
  shortData: [
    {
      shortDate: '2021-03-10T00:00:00.000Z',
      code: 'AMS',
      desc: 'ATOMOS LIMITED',
      shortSale: 1496,
      capital: 218482912,
      percentage: 0,
    },
  ],
};

const mockDataTPW = {
  error: 0,
  shortData: [
    {
      shortDate: '2021-03-10T00:00:00.000Z',
      code: 'TPW',
      desc: 'TPW',
      shortSale: 1496,
      capital: 218482912,
      percentage: 0,
    },
  ],
};
describe('Search Individual Stock Page', () => {
  beforeEach(() => {
    useSWR.mockClear();
  });

  it('Invalid code should return Error Message', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: { error: 1, message: 'Invalid Code' },
      };
    });
    const wrapper = shallow(<SearchIndividualStock />);
    expect(findTestWrapper(wrapper, 'invalid-code').length).toBe(1);
  });

  it('Error fetching data should display error message', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: null,
        error: true,
      };
    });
    const wrapper = shallow(<SearchIndividualStock />);
    expect(findTestWrapper(wrapper, 'error-fetching').length).toBe(1);
  });

  it('Loading should display spinner', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: null,
        error: null,
      };
    });
    const wrapper = shallow(<SearchIndividualStock />);
    expect(findTestWrapper(wrapper, 'spinner').length).toBe(1);
  });
  it('Valid code should display chart', () => {
    useSWR.mockImplementationOnce(() => {
      return {
        data: mockDataAMS,
        error: null,
      };
    });
    const wrapper = shallow(<SearchIndividualStock />);
    expect(findTestWrapper(wrapper, 'chart').length).toBe(1);
    expect(findTestWrapper(wrapper, 'title').length).toBe(1);
  });

  describe('Regarding cookie', () => {
    beforeEach(() => {
      useRouter.mockClear();
      Cookies.mockClear();
    });
    it('Fav stock should be displayed as starred ', () => {
      useRouter.mockImplementation(() => ({
        query: { code: 'AMS' },
      }));

      useSWR.mockImplementation(() => {
        return {
          data: mockDataAMS,
          error: null,
        };
      });
      Cookies.mockImplementation(() => {
        return {
          get: mockGetCookie,
        };
      });

      const wrapper = mount(<SearchIndividualStock />);
      expect(wrapper.find(StarFilled).length).toBe(1);
    });

    it('UnFav stock should be displayed as unstarred ', () => {
      useRouter.mockImplementation(() => ({
        query: { code: 'TPW' },
      }));

      useSWR.mockImplementation(() => {
        return {
          data: mockDataTPW,
          error: null,
        };
      });
      Cookies.mockImplementation(() => {
        return {
          get: mockGetCookie,
        };
      });

      const wrapper = mount(<SearchIndividualStock />);
      // expect(mockGetCookie).toHaveBeenCalled();
      expect(wrapper.find(StarOutlined).length).toBe(1);
    });

    it('Star unstarred stock', () => {
      useRouter.mockImplementation(() => ({
        query: { code: 'TPW' },
      }));

      useSWR.mockImplementation(() => {
        return {
          data: mockDataTPW,
          error: null,
        };
      });
      Cookies.mockImplementation(() => {
        return {
          get: mockGetCookie,
          set: mockSetCookie,
        };
      });
      const wrapper = mount(<SearchIndividualStock />);
      const starred = findTestWrapper(wrapper, 'starred');
      starred.simulate('click', {});
      expect(mockSetCookie).toHaveBeenCalledWith('t', ['KGN', 'AMS', 'TPW']);
    });
    it('Unstar starred stock', () => {
      useRouter.mockImplementation(() => ({
        query: { code: 'AMS' },
      }));

      useSWR.mockImplementation(() => {
        return {
          data: mockDataAMS,
          error: null,
        };
      });
      Cookies.mockImplementation(() => {
        return {
          get: mockGetCookie,
          set: mockSetCookie,
        };
      });
      const wrapper = mount(<SearchIndividualStock />);
      const starred = findTestWrapper(wrapper, 'starred');
      starred.simulate('click', {});
      expect(mockSetCookie).toHaveBeenCalledWith('t', ['KGN']);
    });
  });
});
