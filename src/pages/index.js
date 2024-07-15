import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import AboutMe from '../components/aboutMe';

export const query = graphql`{
  mobileImage: file(relativePath: {eq: "ganapativs-no-bg.png"}) {
    childImageSharp {
      gatsbyImageData(width: 140, height: 140, quality: 100, layout: CONSTRAINED)
    }
  }
  desktopImage: file(relativePath: {eq: "ganapativs-no-bg.png"}) {
    childImageSharp {
      gatsbyImageData(width: 160, height: 160, quality: 100, layout: CONSTRAINED)
    }
  }
}`;
const About = ({ data: profileLogo }) => (
  <>
    <SEO title="Ganapati V S" />
    <AboutMe profileLogo={profileLogo} />
  </>
);

export default About;
