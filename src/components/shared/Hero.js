import styled from 'styled-components';

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  position: relative;
  align-content: center;
`;

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
