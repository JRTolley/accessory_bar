import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { EmptyState, Layout, Page, Loading, Frame } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResourceListForSets from "../../components/ResourceListForSets";
import accessoriesFromResources from "../../utils/frontend/accessoriesFromResources";

const AccessorySets: React.FC = () => {
  const img =
    "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

  // State
  const [sets, setSets] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial data from server
  useEffect(() => {
    axios.get(`api/accessorySets/get`).then((res) => {
      setSets(res.data);
      console.log(res);
      setLoading(false);
    });
  }, []);

  const emptyState = (
    <EmptyState
      heading="Add accessory sets to display to your customers"
      image={img}
      action={{
        content: "Add Set",
        onAction: () => setPickerOpen(true),
      }}
    >
      <p> Help your customers buy what they need</p>
    </EmptyState>
  );

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
      <TitleBar
        title="Accessory Sets"
        primaryAction={{
          content: "Add Set",
          onAction: () => setPickerOpen(true),
        }}
      />
      <Layout>
        <Layout.Section>
          {sets.length === 0 ? (
            emptyState
          ) : (
            <ResourceListForSets sets={sets} setSets={setSets} />
          )}
        </Layout.Section>
      </Layout>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={pickerOpen}
        onSelection={(resources) => createSet(resources)}
        onCancel={() => setPickerOpen(false)}
      />
    </Page>
  );

  async function createSet(resources) {
    console.log("createSet: ", resources);
    const accessories = accessoriesFromResources(resources);
    const returned_sets = await axios.post(`api/accessorySets/create`, {
      accessories,
    });
    setSets(returned_sets.data);
    setPickerOpen(false);
  }
};

export default AccessorySets;
