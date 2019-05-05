import PropTypes from 'prop-types';

const IndexPage = ({ data }) => {
  window.location.assign('/photography');
  return null;
};

IndexPage.defaultProps = {
  data: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
};

export default IndexPage;
