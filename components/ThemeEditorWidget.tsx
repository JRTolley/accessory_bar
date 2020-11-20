import { Card, Layout, SettingToggle } from "@shopify/polaris";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const ThemeEditorWidget: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  const contentStatus = enabled ? "Disable" : "Enable";

  useEffect(() => {
    Axios.get(`api/merchant/get`).then((res) => {
      setEnabled(res.data.showOnThemeEditor);
    });
  }, []);

  return (
    <Layout.AnnotatedSection
      title="Show In Theme Editor"
      description="Enable/Disable loading in the Theme Editor"
    >
      <Card>
        <SettingToggle
          enabled={enabled}
          action={{ content: contentStatus, onAction: handleToggle }}
        >
          Theme Editor Loading is turned {enabled ? "On" : "Off"}
        </SettingToggle>
      </Card>
    </Layout.AnnotatedSection>
  );

  async function handleToggle() {
    await Axios.post("/api/merchant/setShowOnTheme", {
      showOnThemeEditor: !enabled,
    });
    setEnabled(!enabled);
  }
};

export default ThemeEditorWidget;
