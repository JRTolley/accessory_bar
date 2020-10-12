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
import { useQuery } from "urql";
import { AccessorySet } from "../entities/AccessorySet";
import { getProductsById } from "../graphql/queries/getProductsById";

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

  const [result, _] = useQuery({
    query: getProductsById,
    variables: { ids: sets.map((set) => set.baseProduct) },
  });

  const { data, fetching, error } = result;

  if (fetching) return <Card>Loading ...</Card>;
  if (error) return <Card>Error: {error.message}</Card>;

  const fullSets = data.nodes
    .map((res) => {
      const set = sets.filter((s) => s.baseProduct === res.id)[0];
      if (!set) return {};
      return {
        ...set,
        title: res.title,
        img: res.images.edges[0].node.originalSrc,
        alt: res.images.edges[0].node.altText,
      };
    })
    .filter((set) => set.id); // Removes deleted sets

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "Accessory Set", plural: "Accessory Sets" }}
        items={fullSets}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems as any}
        promotedBulkActions={promotedBulkActions}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const { id, accessories, baseProduct, title, img, alt } = item;
    const media = <Thumbnail source={img} alt={alt} />;
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
