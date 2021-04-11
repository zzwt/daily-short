import { shallow } from 'enzyme';

import Header from '../../../src/components/header';
import { findTestWrapper } from '../../../src/utils/testHelper';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  pathname: '/',
}));
it('Header Component should have 5 menu items', () => {
  const wrapper = shallow(<Header />);
  const menuItems = findTestWrapper(wrapper, 'item');
  expect(menuItems.length).toBe(5);
  expect(menuItems.at(0).props().href).toEqual('/');
  expect(menuItems.at(1).props().href).toEqual('/market');
  expect(menuItems.at(2).props().href).toEqual('/searchstock');
  expect(menuItems.at(3).props().href).toEqual('/fav');
  expect(menuItems.at(4).props().href).toEqual('/about');
});
