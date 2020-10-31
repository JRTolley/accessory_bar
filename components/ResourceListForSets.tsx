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
          if (selected === "") {
            setSets(
              sets.sort((a, b) => {
                if (sets.indexOf(a) > sets.indexOf(b)) return 1;
                if (sets.indexOf(a) < sets.indexOf(b)) return -1;
                return 0;
              })
            );
          } else if (selected === "TITLE_ASC") {
            setSets(
              sets.sort((a, b) => {
                if (a.baseProduct.title > b.baseProduct.title) return 1;
                if (a.baseProduct.title < b.baseProduct.title) return -1;
                return 0;
              })
            );
          } else if (selected === "TITLE_DESC") {
            setSets(
              sets.sort((a, b) => {
                if (a.baseProduct.title > b.baseProduct.title) return -1;
                if (a.baseProduct.title < b.baseProduct.title) return 1;
                return 0;
              })
            );
          }
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
