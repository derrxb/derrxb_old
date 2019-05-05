import PropTypes from 'prop-types';
import React from 'react';

const IndexPage = ({ data }) => {
  React.useEffect(() => {
    window.location.assign('/photography');
  }, []);

  return null;
};

IndexPage.defaultProps = {
  data: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
};

export default IndexPage;
