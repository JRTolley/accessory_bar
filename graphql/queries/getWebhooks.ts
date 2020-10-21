import gql from "graphql-tag";

export const getWebhooks = gql`
  query getWebhooks {
    webhookSubscriptions(first: 50) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
