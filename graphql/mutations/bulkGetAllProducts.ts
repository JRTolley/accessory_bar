import gql from "graphql-tag";

export const bulkGetAllProducts = gql`
  mutation bulkGetAllProducts {
    bulkOperationRunQuery(
      query: """
      {
          products(query: "published_status:ACTIVE") {
              edges {
                  node {
                      id
                      title
                      handle
                      status
                      images(first: 1){
                          edges {
                              node {
                                  originalSrc
                                  altText
                              }
                          }
                      }
                      variants(first: 1){
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
      """
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;
