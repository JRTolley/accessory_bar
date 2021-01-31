import { Navigation } from "@shopify/polaris";
import {
  BugMajor,
  ColorsMajor,
  HomeMajor,
  ProductsMajor,
} from "@shopify/polaris-icons";
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
            label: "Custom Accessories",
            icon: ProductsMajor,
          },
          {
            url: "/customization",
            label: "Customization",
            icon: ColorsMajor,
          },
          {
            url: "/releaseNotes",
            label: "Release Notes",
            icon: BugMajor,
          },
        ]}
      />
    </Navigation>
  );
};

export default Sidebar;
