import { Navigation } from "@shopify/polaris";
import { ColorsMajor, HomeMajor, ProductsMajor } from "@shopify/polaris-icons";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  return (
    <Navigation location={useRouter().pathname}>
      <Navigation.Section
        fill={true}
        items={[
          {
            url: "/",
            label: "Home",
            icon: HomeMajor,
            exactMatch: true,
          },
          {
            url: "/accessory-sets",
            label: "Accessory Sets",
            icon: ProductsMajor,
          },
          {
            url: "/customization",
            label: "Customization",
            icon: ColorsMajor,
          },
        ]}
      />
    </Navigation>
  );
};

export default Sidebar;
