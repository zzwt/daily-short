import { mount } from 'enzyme';
import Cookie from 'universal-cookie';
import FavPage from '../../../src/pages/fav';
import { findTestWrapper } from '../../../src/utils/testHelper';
const mockGetCookie = jest.fn(() => {
  return ['KGN', 'AMS'];
});
jest.mock('universal-cookie');

describe('Fav Page', () => {
  beforeEach(() => {
    Cookie.mockClear();
  });
  it('No favs in cookie should display message', () => {
    Cookie.mockImplementation(() => {
      return {
        get: () => {},
      };
    });
    const wrapper = mount(<FavPage />);
    expect(findTestWrapper(wrapper, 'msg').length).toBe(1);
  });

  it('With favs in cookie should have a short list', () => {
    Cookie.mockImplementation(() => {
      return {
        get: mockGetCookie,
      };
    });
    const wrapper = mount(<FavPage />);
    expect(mockGetCookie).toHaveBeenCalledWith('t');
    expect(findTestWrapper(wrapper, 'starred').length).toBe(1);
  });
});
