import { graphql } from 'gatsby';
import React from 'react';
import AboutMe from '../components/aboutMe';
import Seo from '../components/seo';

export const query = graphql`
  {
    mobileImage: file(relativePath: { eq: "ganapativs-no-bg.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 140
          height: 140
          quality: 100
          layout: CONSTRAINED
        )
      }
    }
    desktopImage: file(relativePath: { eq: "ganapativs-no-bg.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 140
          height: 140
          quality: 100
          layout: CONSTRAINED
        )
      }
    }
  }
`;
const About = ({ data: profileLogo }) => (
  <>
    <Seo title="Ganapati V S" />
    <AboutMe profileLogo={profileLogo} />
  </>
);

export default About;
