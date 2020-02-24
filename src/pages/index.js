import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import AboutMe from '../components/aboutMe';

export const query = graphql`
  query {
    mobileImage: file(relativePath: { eq: "ganapativs.jpg" }) {
      childImageSharp {
        # 120 * 1.1 (-5% margin)
        fluid(maxWidth: 140, maxHeight: 140, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    desktopImage: file(relativePath: { eq: "ganapativs.jpg" }) {
      childImageSharp {
        # 160 * 1.1 (-5% margin)
        fluid(maxWidth: 160, maxHeight: 160, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
const About = ({ data: profileLogo }) => (
  <>
    <SEO title="Ganapati V S" />
    <AboutMe profileLogo={profileLogo} />
  </>
);

export default About;
