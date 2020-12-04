import { TitleBar } from "@shopify/app-bridge-react";
import { Frame, Layout, Loading, Page } from "@shopify/polaris";
import Axios from "axios";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import FeedbackWidget from "../components/FeedbackWidget";
import OnOffWidget from "../components/OnOffWidget";
import ThemeEditorWidget from "../components/ThemeEditorWidget";

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
        <OnOffWidget />
        <ThemeEditorWidget />
        <FeedbackWidget />
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
