/* Global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Home } from './Home';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Home', () => {
  let home = shallow(<Home getTrips={() => {}} trips={[]} id={1} />);

  it('renders button to create new trip', () => {
    expect(home.find('.button-create-new-trip').text()).to.be.equal(
      'Create New Trip'
    );
  });
});
