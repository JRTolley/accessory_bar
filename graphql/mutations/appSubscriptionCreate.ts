import gql from "graphql-tag";

export const appSubscriptionCreate = gql`
  mutation appSubscriptionCreate(
    $name: String!
    $returnUrl: URL!
    $price: Float!
  ) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: $price, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
      }
    }
  }
`;
