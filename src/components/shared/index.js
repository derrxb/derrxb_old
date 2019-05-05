import styled from 'styled-components';
import Media from './Media';

const H1 = styled.h1`
  color: #333333;
  margin: 0 0 0.5em;
  font-size: 1.8em;
  font-weight: 700;

  ${Media.lessThan('laptop')`
    font-size: 1.6em;
  `}

  ${Media.lessThan('mobile')`
    font-size: 1.5em;
  `}
`;

export { H1 };
