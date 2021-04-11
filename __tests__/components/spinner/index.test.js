import { shallow } from 'enzyme';

import Spinner from '../../../src/components/spinner';
import { findTestWrapper } from '../../../src/utils/testHelper';

it('Spinner Component should include an image', () => {
  const wrapper = shallow(<Spinner />);
  expect(findTestWrapper(wrapper, 'image')).toHaveLength(1);
});
