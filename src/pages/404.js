import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { H1 } from '../components/shared';
import sadKitty from '../images/sad kitty.svg';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5em',
      }}
    >
      <H1>
        Oops, I think we lost this page. Lola also lost her yarn!
        <span role="img" aria-label="sad">
          😭😿
        </span>
      </H1>

      <img src={sadKitty} alt="sad kitty" height="400" width="320" />
      <p style={{ marginBottom: '0.5em' }}>
        Click
        <Link to="/"> here </Link>
        to go to the home page to start again.
      </p>

      <p style={{ fontSize: '10px' }}>
        On a more serious note, I have been busy with school recently so I&#39;ll try my
        best to keep this updated.
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
