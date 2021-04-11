import { shallow } from 'enzyme';
import SearchStock from '../../../src/pages/searchstock';
import { findTestWrapper } from '../../../src/utils/testHelper';

it('Search Stock Page should display message by default', () => {
  const wrapper = shallow(<SearchStock />);
  expect(findTestWrapper(wrapper, 'msg').length).toBe(1);
});
