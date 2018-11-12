import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Enzyme from 'enzyme';
import Avatar from '../../../src/moudle/avatar/avatar';

function setup() {
  const props = {

  };

  const enzymeWrapper = mount(<Avatar />);
  return {
    props,
    enzymeWrapper
  }
}
 
describe('<Avatar />', () => {
    it('should render dom', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('div'));
    })
  })