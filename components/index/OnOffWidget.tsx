import { Card, Layout, SettingToggle } from "@shopify/polaris";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const OnOffWidget: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  const contentStatus = enabled ? "Disable" : "Enable";

  useEffect(() => {
    Axios.get(`api/merchant/get`).then((res) => {
      setEnabled(res.data.enabled);
    });
  }, []);

  return (
    <Layout.AnnotatedSection
      title="Show In Storefront"
      description="Enable or disable loading of the Accessory Bar in product pages"
    >
      <Card>
        <SettingToggle
          enabled={enabled}
          action={{ content: contentStatus, onAction: handleToggle }}
        >
          Storefront loading is turned {enabled ? "On" : "Off"}
        </SettingToggle>
      </Card>
    </Layout.AnnotatedSection>
  );

  async function handleToggle() {
    await Axios.post("/api/merchant/setEnabled", { enabled: !enabled });
    setEnabled(!enabled);
  }
};

export default OnOffWidget;
