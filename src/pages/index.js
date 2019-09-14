import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import AboutMe from '../components/aboutMe';

export const query = graphql`
  query {
    mobileImage: file(relativePath: { eq: "ganapativs.png" }) {
      childImageSharp {
        # 120 * 1.1 (-5% margin)
        fluid(maxWidth: 132, maxHeight: 132, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    desktopImage: file(relativePath: { eq: "ganapativs.png" }) {
      childImageSharp {
        # 160 * 1.1 (-5% margin)
        fluid(maxWidth: 176, maxHeight: 176, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;
const About = ({ data: profileLogo }) => (
  <Layout>
    <SEO title="About" />
    <AboutMe profileLogo={profileLogo} />
  </Layout>
);

export default About;
