import { shallow } from 'enzyme';

import Message from '../../../src/components/message';

test('Message Component should render content ', () => {
  const wrapper = shallow(<Message content="test" />);
  expect(wrapper.find('h3')).toHaveLength(1);
});
