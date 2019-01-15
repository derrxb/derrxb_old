// lets you list files that will be included before all tests are run, so it’s perfect for this.
// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
};
