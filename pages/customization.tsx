import { TitleBar } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Page,
  RangeSlider,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Customization: React.FC = () => {
  const [customizationProfile, setCustomizationProfile] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);
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
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <TextStyle variation="strong">Set customization options</TextStyle>
          <FormLayout>
            <TextStyle variation="strong">Title</TextStyle>
            <TextField type="text" label="Title" onChange={() => {}} />
            <TextField type="text" label="Font" onChange={() => {}} />
            <TextField type="number" label="Font size" onChange={() => {}} />

            <TextStyle variation="strong">Accessory Bar</TextStyle>
            <FormLayout.Group>
              <RangeSlider
                label="Horizontal Padding"
                value={0}
                onChange={() => {}}
                output
              />
              <Button>Reset</Button>
            </FormLayout.Group>

            <FormLayout.Group>
              <RangeSlider
                label="Vertical Padding"
                value={0}
                onChange={() => {}}
                output
              />
              <Button>Reset</Button>
            </FormLayout.Group>

            <TextStyle variation="strong">Accessory Item</TextStyle>
            <TextField type="text" label="Font" onChange={() => {}} />
            <TextField type="number" label="Font Size" onChange={() => {}} />
            <FormLayout.Group>
              <RangeSlider
                label="Max Size in pem"
                value={rangeValue}
                onChange={() => {}}
                output
              />
              <Button>Reset</Button>
            </FormLayout.Group>
            <FormLayout.Group>
              <RangeSlider
                label="Padding between items in pem"
                value={0}
                onChange={() => {}}
                output
              />
              <Button>Reset</Button>
            </FormLayout.Group>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );

  async function createProfile() {
    setLoading(true);
    const res = await Axios.post("/api/customization/create");
    setCustomizationProfile(res.data);
    setLoading(false);
  }

  async function handleSubmit() {}
};

export default Customization;
