import { TitleBar } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  DisplayText,
  Frame,
  Heading,
  Layout,
  Loading,
  Page,
  Stack,
} from "@shopify/polaris";
import Axios from "axios";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Merchant } from "../entities/Merchant";

const Index: React.FC = () => {
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`api/merchant/get`).then((res) => {
      setMerchant(res.data);
      console.log("Merchant: ", res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Page>
        <Frame>
          <Loading />
        </Frame>
      </Page>
    );

  return (
    <Page>
      <TitleBar title="Overview"></TitleBar>
      <Layout>
        <Layout.AnnotatedSection title="Current Plan Type">
          <Card
            title={merchant.planType}
            primaryFooterAction={{
              content: "Upgrade",
              url: "/billing",
            }}
          />
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Reset webhooks and Script Tags">
          <Card
            title="Wooo"
            primaryFooterAction={{
              content: "Reset",
              onAction: resetStorefront,
            }}
          />
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );

  async function resetStorefront() {
    await Axios.get("/api/storefront/reset");
    console.log("Reset storefront reset");
  }
};

export default withUrqlClient((_ssrExchange, ctx) => ({
  url: "/graphql",
}))(Index);
