import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup, wait } from 'react-testing-library';
import ReactModal from 'react-modal';
import Header from '../index';

ReactModal.setAppElement(document.createElement('div'));

afterEach(cleanup);

describe('Header Spec', () => {
  it('Ensures the correct number of links are displayed', () => {
    // Arrange
    const links = [
      { name: 'Test', to: '/test1' },
      { name: 'Test2', to: '/test2' },
      { name: 'Test 3', to: 'test3' },
    ];

    // Act
    const { queryAllByTestId } = render(<Header nature="default" links={links} />);

    // Assert
    expect(queryAllByTestId('nav-link').length).toEqual(3);
  });

  test('renders the menu modal on `menu` click', async () => {
    // Arrange
    const links = [
      { name: 'Test', to: '/test1' },
      { name: 'Test2', to: '/test2' },
      { name: 'Test 3', to: 'test3' },
    ];

    window.innerWidth = '480px';
    window.dispatchEvent(new Event('resize'));

    const { getByTestId, getByText, queryAllByTestId } = render(
      <Header nature="default" links={links} />
    );

    // Act
    fireEvent.click(getByText(/menu/i));

    // Assert
    expect(getByTestId('menu-nav-modal')).toBeInTheDocument();

    await wait(() => expect(getByTestId('menu-nav-modal')).toBeVisible());
    expect(queryAllByTestId('modal-nav-link').length).toEqual(3);
  });
});
