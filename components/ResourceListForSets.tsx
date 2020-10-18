import {
  Card,
  ResourceItem,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import Axios from "axios";
import React, { useState } from "react";
import { AccessorySet } from "../entities/AccessorySet";

interface Props {
  sets: AccessorySet[];
  setSets: (sets: AccessorySet[]) => void;
}

const ResourceListForSets: React.FC<Props> = ({ sets, setSets }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: () => deleteSets(),
    },
  ];

  console.log("Sets: ", sets);

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "Accessory Set", plural: "Accessory Sets" }}
        items={sets}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems as any}
        promotedBulkActions={promotedBulkActions}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const { id, accessories, baseProduct } = item;
    const { img, title } = baseProduct;
    const media = <Thumbnail source={img} alt={"no-set"} />;
    return (
      <ResourceItem id={id} url={"accessory-sets/" + id} media={media}>
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <Stack>
          <div>
            <TextStyle variation="subdued">Accessories: </TextStyle>
            <TextStyle variation="strong">{accessories.length || 0}</TextStyle>
          </div>
        </Stack>
      </ResourceItem>
    );
  }

  async function deleteSets() {
    console.log("Delete Sets: ", selectedItems);
    await Axios.post(`api/accessorySets/delete`, { ids: selectedItems }).then(
      (res) => {
        setSets(res.data);
      }
    );
    setSelectedItems([]);
  }
};

export default ResourceListForSets;
