import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { H1 } from '../components/shared';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <H1>
      NOT FOUND...YET
      <span role="img" aria-label="celebration emojis">
        🎉🎉
      </span>
    </H1>
    <p>This site is a work in progress. Do not worry, cool things are coming soon.</p>
  </Layout>
);

export default NotFoundPage;
