import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { Page, EmptyState } from "@shopify/polaris";
import axios from "axios";
import React from "react";
import { AccessorySet } from "../entities/AccessorySet";
import { Merchant } from "../entities/Merchant";
import initDB from "../utils/initDB";

interface AccessorySetType {
  id: number;
  baseProduct: string;
}

interface Props {
  initialSets: AccessorySetType[];
}

class AccessorySets extends React.Component<Props> {
  state = {
    pickerOpen: false,
    createdSets: [],
  };

  img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

  async createSet(resources) {
    const ids = resources.selection.map((product) => product.id);
    this.setState({ pickerOpen: false });
    console.log(ids);
    const res = await axios.post("/api/accessorySets/create", ids);
    console.log("Res:", res);
    this.setState({ createdSets: this.state.createdSets.push(res) });
  }

  getSets() {
    return this.props.initialSets.concat(this.state.createdSets);
  }

  isEmpty() {
    return !this.getSets();
  }

  render() {
    // Empty State
    const myEmptyState = (
      <div>
        <EmptyState
          heading="Add accessory sets to display to your customers"
          image={this.img}
          action={{
            content: "Add Set",
            onAction: () => this.setState({ pickerOpen: true }),
          }}
        >
          <p> Help your customers buy what they need</p>
        </EmptyState>
      </div>
    );
    // Resource list
    const resourceList = (
      <div>
        {this.getSets().map((aSet) => (
          <p>{aSet.baseProduct}</p>
        ))}
      </div>
    );
    return (
      <Page>
        <TitleBar
          title="Accessory Sets"
          primaryAction={{
            content: "Add Set",
            onAction: () => this.setState({ pickerOpen: true }),
          }}
        ></TitleBar>
        {/* Display resource list is we have any */}
        {this.isEmpty() ? myEmptyState : resourceList}
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.pickerOpen}
          onSelection={(resources) => this.createSet(resources)}
          onCancel={() => this.setState({ pickerOpen: false })}
          allowMultiple={false}
        />
      </Page>
    );
  }
}

export async function getServerSideProps(context) {
  await initDB.check();
  // Find existing accessory sets
  const merchant = await Merchant.findOne({ shopName: context.query.shop });
  const sets = await AccessorySet.find({
    where: { merchant },
    select: ["id", "baseProduct"],
  });
  console.log(sets);
  // Get rid of undefined
  const results = sets.map((aSet) => {
    return {
      id: aSet.id,
      baseProduct: aSet.baseProduct,
    };
  });
  console.log("Sets: ", results);
  return {
    props: {
      initialSets: results,
    },
  };
}

export default AccessorySets;
