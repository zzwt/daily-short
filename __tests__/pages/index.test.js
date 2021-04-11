import { shallow } from 'enzyme';

import IndexPage from '../../src/pages';
import { findTestWrapper } from '../../src/utils/testHelper';

it('Index page should  have a short list', () => {
  const wrapper = shallow(<IndexPage />);
  expect(findTestWrapper(wrapper, 'shortlist')).toHaveLength(1);
});
