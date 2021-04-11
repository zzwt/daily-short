import { shallow } from 'enzyme';

import PercentageBar from '../../../src/components/percentageBar';
import { findTestWrapper } from '../../../src/utils/testHelper';

it('PercentageBar Component should have a bar div ', () => {
  const wrapper = shallow(<PercentageBar />);
  expect(findTestWrapper(wrapper, 'bar').length).toBe(1);
});
