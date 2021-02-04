import { Card, Layout, SettingToggle } from "@shopify/polaris";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const AutomaticSetsWidget: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [polling, setPolling] = useState(false);

  const contentStatus = enabled ? (polling ? "Polling" : "Disable") : "Enable";

  useEffect(() => {
    Axios.get(`api/merchant/get`).then((res) => {
      setEnabled(res.data.automaticSets);
    });
  }, []);

  return (
    <Layout.AnnotatedSection
      title="Automatic Accessories"
      description="Show accessories for all products"
    >
      <Card>
        <SettingToggle
          enabled={enabled}
          action={{ content: contentStatus, onAction: handleToggle }}
        >
          Automatic Accessories in turned{" "}
          {enabled ? (polling ? "Polling" : "On") : "Off"}
        </SettingToggle>
      </Card>
    </Layout.AnnotatedSection>
  );

  async function handleToggle() {
    await Axios.post("/api/automaticSets/setEnabled", { enabled: !enabled });
    setEnabled(!enabled);
    if (!enabled) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setPolling(true);
      await pollStatus();
    }
  }

  async function pollStatus() {
    const res = await Axios.get("/api/automaticSets/pollStatus");
    console.log("PollStatus: ", res);
    if (res.data === "RUNNING" || res.data === "CREATED") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await pollStatus();
      return;
    } else if (res.data === "COMPLETED") {
      console.log("COMPLETED");
      setPolling(false);
      return;
    }
  }
};

export default AutomaticSetsWidget;
