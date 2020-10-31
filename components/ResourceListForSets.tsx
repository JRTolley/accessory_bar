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
import { sortAccessories } from "../utils/frontend/sortAccessories";

interface Props {
  sets: AccessorySet[];
  setSets: (sets: AccessorySet[]) => void;
}

const ResourceListForSets: React.FC<Props> = ({ sets, setSets }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState("");

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
        sortValue={sortValue}
        sortOptions={[
          { label: "---", value: "" },
          { label: "A to Z", value: "TITLE_ASC" },
          { label: "Z to A", value: "TITLE_DESC" },
        ]}
        onSortChange={(selected) => {
          setSortValue(selected);
          sortAccessories(selected, sets, setSets);
        }}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const { id, accessories, baseProduct, impressions } = item;
    const { img, title } = baseProduct;
    const media = <Thumbnail source={img} alt={"no-set"} />;
    return (
      <ResourceItem id={id} url={"accessory-sets/" + id} media={media}>
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <Stack distribution="leading" alignment="fill" spacing="extraLoose">
          <Stack alignment="center" spacing="tight">
            <TextStyle variation="subdued">Accessories: </TextStyle>
            <TextStyle variation="strong">{accessories.length || 0}</TextStyle>
          </Stack>
          {/* </Stack>
        <Stack> */}
          <Stack alignment="center" spacing="tight">
            <TextStyle variation="subdued">Impressions: </TextStyle>
            <TextStyle variation="strong">{impressions}</TextStyle>
          </Stack>
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
