import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../index';

describe('Header Spec', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header nature="default" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
