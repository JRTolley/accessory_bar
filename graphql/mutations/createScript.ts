import gql from "graphql-tag";

export const createScript = gql`
  mutation createScript($displayScope: String!, $src: String!) {
    scriptTagCreate(input: { displayScope: $displayScope, src: $src }) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
