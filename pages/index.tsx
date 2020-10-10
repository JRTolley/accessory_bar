import { Heading, Page } from "@shopify/polaris";
import axios from "axios";
import { useEffect } from "react";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import gql from "graphql-tag";
import { TitleBar } from "@shopify/app-bridge-react";

const PRODUCT_QUERY = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
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
`;

const Index: React.FC = () => {
  const [result, _] = useQuery({
    query: PRODUCT_QUERY,
    variables: { ids: ["gid://shopify/Product/5444127686823"] },
  });

  const { data, fetching, error } = result;

  if (fetching) return <p> Loading... </p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Page>
      <TitleBar title="Overview"></TitleBar>
      <Heading>
        It works!
        {data.nodes.map((node) => (
          <p>{node.title}</p>
        ))}
      </Heading>
    </Page>
  );
};

export default withUrqlClient((_ssrExchange, ctx) => ({
  url: "/graphql",
}))(Index);
