import { shallow } from 'enzyme';

import AboutPage from '../../../src/pages/about';
import { findTestWrapper } from '../../../src/utils/testHelper';

it('About page should have info sections', () => {
  const wrapper = shallow(<AboutPage />);
  expect(findTestWrapper(wrapper, 'data-disclaimer')).toHaveLength(1);
  expect(findTestWrapper(wrapper, 'privacy')).toHaveLength(1);
  expect(findTestWrapper(wrapper, 'contact')).toHaveLength(1);
});
