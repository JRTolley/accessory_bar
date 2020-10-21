import gql from "graphql-tag";

export const getScriptTags = gql`
  query getScriptTags {
    scriptTags(first: 10) {
      edges {
        node {
          id
          src
        }
      }
    }
  }
`;
