import styled from 'styled-components';
import Media from './Media';

const H1 = styled.h1`
  color: #333333;
  margin: 0.4em 0 0.5em;
  font-size: 1.5em;
  font-weight: 700;

  ${Media.greaterThan('bigMonitor')`
    font-size: 2.4em;
  `};

  ${Media.lessThan('laptop')`
    font-size: 1.3em;
  `}

  ${Media.lessThan('mobile')`
    font-size: 1.1em;
  `}
`;

const Paragraph = styled.p`
  line-height: 28px;
  font-size: 1em;
  margin: 0.5em 0 1em;

  ${Media.greaterThan('bigMonitor')`
    font-size: 1.8em;
    line-height: 1.8em;
  `};
`;

/**
 * Formats HTML generated from Markdown file.
 *
 * Perhaps we can use React Hype (https://github.com/rehypejs/rehype-react)
 * to it easier to reuse styles for elements that don't come from Markdown files.
 */
const MarkdownWrapper = styled.div`
  p,
  blockquote {
    line-height: 28px;
    font-size: 1em;
    margin: 0.5em 0 1em;

    ${Media.greaterThan('bigMonitor')`
      font-size: 1.8em;
      line-height: 1.8em;
    `};
  }

  blockquote {
    margin-left: 1.2em;
  }

  a {
    text-decoration: none;
    color: rgb(0, 32, 66);
    font-weight: 550;

    &:hover {
      text-decoration: underline;
    }
  }

  margin-bottom: 1em;
`;

export { H1, Paragraph, MarkdownWrapper };
