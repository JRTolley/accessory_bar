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
      title="Turn Accessory Bar On/Off"
      description="Disable accessory bar loading on your storefront"
    >
      <Card>
        <SettingToggle
          enabled={enabled}
          action={{ content: contentStatus, onAction: handleToggle }}
        >
          Accessory bar is turned {enabled ? "On" : "Off"}
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
