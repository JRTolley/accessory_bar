import { TitleBar } from "@shopify/app-bridge-react";
import { Heading, Page } from "@shopify/polaris";
import { withUrqlClient } from "next-urql";

const Index: React.FC = () => {
  return (
    <Page>
      <TitleBar title="Overview"></TitleBar>
      <Heading>It works!</Heading>
    </Page>
  );
};

export default withUrqlClient((_ssrExchange, ctx) => ({
  url: "/graphql",
}))(Index);
