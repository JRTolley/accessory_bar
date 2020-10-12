import {
  Card,
  ResourceItem,
  ResourceList,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import Axios from "axios";
import React, { useState } from "react";
import { useQuery } from "urql";
import { AccessorySet } from "../entities/AccessorySet";
import { getProductsById } from "../graphql/queries/getProductsById";

interface Props {
  set: AccessorySet;
  setSet: (set: AccessorySet) => void;
}

const ResourceListForAccessories: React.FC<Props> = ({ set, setSet }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: () => deleteAccessories(),
    },
  ];

  const [result, _] = useQuery({
    query: getProductsById,
    variables: { ids: set.accessories.map((acc) => acc.pid) },
  });

  const { data, fetching, error } = result;

  if (fetching) return <Card>Loading...</Card>;
  if (error) return <Card>Error: {error.message}</Card>;

  // Build the objects we need
  const fullSets = data.nodes
    .map((res) => {
      const accessory = set.accessories.filter((a) => a.pid === res.id)[0];
      if (!accessory) return {};
      return {
        ...accessory,
        title: res.title,
        img: res.images.edges[0].node.originalSrc,
        alt: res.images.edges[0].node.altText,
      };
    })
    .filter((acc) => acc.id); // Removes delete accessories

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "Accessory", plural: "Accessories" }}
        items={fullSets}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems as any} // Works but throwing type error?
        promotedBulkActions={promotedBulkActions}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const { id, pid, title, img, alt } = item;
    const media = <Thumbnail source={img} alt={alt} />;
    return (
      <ResourceItem id={id} onClick={null} media={media}>
        <TextStyle variation="strong">{title}</TextStyle>
      </ResourceItem>
    );
  }

  async function deleteAccessories() {
    const remaining = set.accessories.filter(
      (acc) => !selectedItems.includes(acc.id)
    );
    await Axios.post(`/api/accessorySets/update`, {
      id: set.id,
      accessories: remaining.map((acc) => acc.pid),
    }).then((res) => {
      setSet(res.data);
    });
    setSelectedItems([]);
  }
};

export default ResourceListForAccessories;
