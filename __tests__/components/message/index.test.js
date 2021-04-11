import { shallow } from 'enzyme';

import Message from '../../../src/components/message';
import { findTestWrapper } from '../../../src/utils/testHelper';

it('Message Component should render content ', () => {
  const wrapper = shallow(<Message content="test" />);
  expect(findTestWrapper(wrapper, 'message')).toHaveLength(1);
});
