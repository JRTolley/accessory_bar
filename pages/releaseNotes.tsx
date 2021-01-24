import { TitleBar } from "@shopify/app-bridge-react";
import { Card, Layout, List, Page } from "@shopify/polaris";
import React from "react";

const ReleaseNotes: React.FC = () => {
  return (
    <Page>
      <TitleBar title="Release Notes"></TitleBar>
      <Card title="January Update" sectioned>
        <List>
          <List.Item>Added Release Notes Section</List.Item>
          <List.Item>Added Introduction Tutorial Video</List.Item>
          <List.Item>
            Added Customization Options for the Accessory Bar
          </List.Item>
          <List.Item>
            Added Classes and Tags to Accessory Bar for css styling
          </List.Item>
        </List>
      </Card>
    </Page>
  );
};

export default ReleaseNotes;
