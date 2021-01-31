import gql from "graphql-tag";

export const getAllProducts = gql`
  query getAllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }
`;
