import React from 'react';

import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div>
      <h2 style={{ color: 'var(--color-light)' }}>
        This route doesn&#39;t exist...
      </h2>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
