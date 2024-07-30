import { Link } from "gatsby";
import React from "react";
import Seo from "../components/seo";

const NotFoundPage = () => (
  <>
    <Seo title='404: Not found' />
    <div>
      <h2>This route doesn&#39;t exist...</h2>
      <p>
        <Link to='/'>Go to homepage</Link>
      </p>
    </div>
  </>
);

export default NotFoundPage;
