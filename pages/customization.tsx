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
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState(null);
  const [titleFont, setTitleFont] = useState(null);
  const [titleFontSize, setTitleFontSize] = useState(null);
  const [barPaddingX, setBarPaddingX] = useState(null);
  const [barPaddingY, setBarPaddingY] = useState(null);
  const [itemMaxXSize, setItemMaxXSize] = useState(null);
  const [itemFont, setItemFont] = useState(null);
  const [itemFontSize, setItemFontSize] = useState(null);
  const [itemPaddingX, setItemPaddingX] = useState(null);

  const [rangeValue, setRangeValue] = useState(0);

  useEffect(() => {
    Axios.get(`api/customization/get`).then((res) => {
      setCustomizationProfile(res.data);
      if (res.data) {
        setTitle(res.data.title);
        setTitleFont(res.data.titleFont);
        setTitleFontSize(res.data.titleFontSize);
        setBarPaddingX(res.data.barPaddingX);
        setBarPaddingY(res.data.barPaddingY);
        setItemMaxXSize(res.data.itemMaxXSize);
        setItemFont(res.data.itemFont);
        setItemFontSize(res.data.itemFontSize);
        setItemPaddingX(res.data.itemPaddingX);
      }
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
            <TextField
              type="text"
              label="Title"
              value={title}
              onChange={(i) => {
                i === "" ? setTitle(null) : setTitle(i);
              }}
            />
            <TextField
              type="text"
              label="Font"
              value={titleFont}
              onChange={(i) => {
                i === "" ? setTitleFont(null) : setTitleFont(i);
              }}
            />
            <TextField
              type="number"
              label="Font size"
              value={titleFontSize ? titleFontSize.toString() : ""}
              onChange={(i) => {
                i === "" ? setTitleFontSize(null) : setTitleFontSize(i);
              }}
            />

            <TextStyle variation="strong">Accessory Bar</TextStyle>
            <FormLayout.Group>
              <RangeSlider
                label="Horizontal Padding"
                max={25}
                value={barPaddingX}
                onChange={(i) => {
                  setBarPaddingX(i);
                }}
                output
              />
              <Button onClick={() => setBarPaddingX(null)}>Reset</Button>
            </FormLayout.Group>

            <FormLayout.Group>
              <RangeSlider
                label="Vertical Padding"
                value={barPaddingY}
                onChange={(i) => {
                  setBarPaddingY(i);
                }}
                output
              />
              <Button onClick={() => setBarPaddingY(null)}>Reset</Button>
            </FormLayout.Group>

            <TextStyle variation="strong">Accessory Item</TextStyle>
            <TextField
              type="text"
              label="Font"
              value={itemFont}
              onChange={(i) => {
                i === "" ? setItemFont(null) : setItemFont(i);
              }}
            />
            <TextField
              type="number"
              label="Font Size"
              value={itemFontSize ? itemFontSize.toString() : ""}
              onChange={(i) => {
                i === "" ? setItemFontSize(null) : setItemFontSize(+i);
              }}
            />
            <FormLayout.Group>
              <RangeSlider
                label="Max Size in pem"
                value={itemMaxXSize}
                min={5}
                max={20}
                onChange={(i) => {
                  setItemMaxXSize(i);
                }}
                output
              />
              <Button
                onClick={() => {
                  setItemMaxXSize(null);
                }}
              >
                Reset
              </Button>
            </FormLayout.Group>
            <FormLayout.Group>
              <RangeSlider
                label="Padding between items in pem"
                value={itemPaddingX}
                max={50}
                onChange={(i) => {
                  setItemPaddingX(i);
                }}
                output
              />
              <Button
                onClick={() => {
                  setItemPaddingX(null);
                }}
              >
                Reset
              </Button>
            </FormLayout.Group>
            <Button submit>Update</Button>
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

  async function handleSubmit() {
    console.log("Updated");
    let update = {
      title,
      titleFont,
      titleFontSize,
      barPaddingX,
      barPaddingY,
      itemFont,
      itemFontSize,
      itemMaxXSize,
      itemPaddingX,
    };
    console.log(update);
    setLoading(true);
    const res = await Axios.post(`/api/customization/update`, update);
    setLoading(false);
  }
};

export default Customization;
