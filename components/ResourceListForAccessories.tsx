import {
  Card,
  ResourceItem,
  ResourceList,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import Axios from "axios";
import React, { useState } from "react";
import { AccessorySet } from "../entities/AccessorySet";

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

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "Accessory", plural: "Accessories" }}
        items={set.accessories}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems as any} // Works but throwing type error?
        promotedBulkActions={promotedBulkActions}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const { id, pid, title, img } = item;
    const media = <Thumbnail source={img} alt={"not-set"} />;
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
      accessories: remaining,
    }).then((res) => {
      console.log("Delete Accessories Response: ", res.data);
      setSet(res.data);
    });
    setSelectedItems([]);
  }
};

export default ResourceListForAccessories;
