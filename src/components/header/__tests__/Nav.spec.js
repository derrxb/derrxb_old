import React from 'react';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';
import ReactModal from 'react-modal';
import NavMobile from '../NavMobile';
import NavLaptop from '../NavLaptop';

afterEach(cleanup);

ReactModal.setAppElement(document.createElement('div'));

describe('NavModal Specs', () => {
  test('renders the menu modal on `menu` click', () => {
    // Arrange
    const { getByTestId, getByText } = render(<NavMobile />);

    // Act
    fireEvent.click(getByText(/menu/i));

    // Assert
    expect(getByTestId('menu-nav-modal')).toBeInTheDocument();
  });

  it('renders the modal on > desktop correctly', () => {
    const tree = renderer.create(<NavLaptop />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
