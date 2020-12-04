import { TitleBar } from "@shopify/app-bridge-react";
import {
  Card,
  Frame,
  Layout,
  Loading,
  Page,
  TextStyle,
} from "@shopify/polaris";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Customization: React.FC = () => {
  const [customizationProfile, setCustomizationProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`api/customization/get`).then((res) => {
      setCustomizationProfile(res.data);
      console.log("Customization: ", res.data);
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

  if (!customizationProfile) {
    return (
      <Page>
        <TitleBar title="Customization"></TitleBar>
        {/* <Layout> */}
        <Card
          title="Customize your accessory bar"
          sectioned
          primaryFooterAction={{ content: "Add", onAction: createProfile }}
        >
          <p>Add a custom profile</p>
        </Card>
        {/* </Layout> */}
      </Page>
    );
  }

  return (
    <Page>
      <TitleBar title="Customization"></TitleBar>
      <Layout>
        <TextStyle variation="strong">Woo we did it</TextStyle>
      </Layout>
    </Page>
  );

  async function createProfile() {
    setLoading(true);
    const res = await Axios.post("/api/customization/create");
    setCustomizationProfile(res.data);
    setLoading(false);
  }
};

export default Customization;
