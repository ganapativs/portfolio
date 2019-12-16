import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import AboutMe from '../components/aboutMe';

export const query = graphql`
  query {
    mobileImage: file(relativePath: { eq: "ganapativs.jpg" }) {
      childImageSharp {
        # 120 * 1.1 (-5% margin)
        fluid(maxWidth: 132, maxHeight: 132, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    desktopImage: file(relativePath: { eq: "ganapativs.jpg" }) {
      childImageSharp {
        # 160 * 1.1 (-5% margin)
        fluid(maxWidth: 176, maxHeight: 176, quality: 100) {
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
