import styled from 'styled-components';
import PropTypes from 'prop-types';
import Media from './Media';

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ nature, height }) => (nature === 'fluid' ? '90vh' : height)};
  max-height: ${({ nature, height }) => (nature === 'fluid' ? '90vh' : height)};
  overflow: hidden;
  position: relative;
  align-content: center;

  ${Media.greaterThan('bigMonitor')`
    height: ${({ nature }) => nature === 'fixed' && 'auto'};
    max-height: ${({ nature }) => nature === 'fixed' && 'max-content'};
  `}

  ${Media.lessThan('tablet')`
    height: ${({ nature }) => nature === 'fixed' && 'auto'};
    max-height: ${({ nature }) => nature === 'fixed' && 'auto'};
  `};
`;

Hero.propTypes = {
  nature: PropTypes.oneOf(['fluid', 'fixed']),
};

Hero.defaultProps = {
  nature: 'fixed',
  height: '400px',
};

export const HeroNav = styled.div`
  z-index: 10;
  width: 100%;
`;

export const HeroHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: normal;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em 2em;
  width: auto;
  max-width: calc(100% - 60%);
  height: auto;
  z-index: 10;
  border-radius: 7px 0 0 7px;

  * {
    margin-bottom: 0.5em;
  }

  h2 {
    margin: 0 0 1em 0;
    color: #ffcc05;
  }

  p {
    margin: 0 inherit;
    color: white;
  }
`;
