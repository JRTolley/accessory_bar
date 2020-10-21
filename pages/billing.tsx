import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  Frame,
  Layout,
  Loading,
  Page,
  TextStyle,
} from "@shopify/polaris";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Redirect } from "@shopify/app-bridge/actions";

const Billing: React.FC = () => {
  const router = useRouter();
  // const app = useAppBridge();
  // app.dispatch.

  const [loading, setLoading] = useState(false);

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  function subscribeButton(type: string) {
    setLoading(true);
    Axios.get(`/api/billing/${type}`).then(async (res) => {
      console.log("Res: ", res.data);
      // window.open(res.data, "_self");
      redirect.dispatch(Redirect.Action.ADMIN_PATH, "/" + res.data);
      // await router.push(res.data);
    });
  }

  const betaPlan = (
    <Card title="Beta">
      <Card.Section>
        <TextStyle variation="subdued">All access during our Beta</TextStyle>
      </Card.Section>
      <Card.Section title="Features">
        <p> Unlimited Accessory Sets </p>
        <p> Unlimited Accessory Bar Impressions</p>
        <p> Priority email support </p>
        <p> Free updates </p>
      </Card.Section>
      <Card.Section title="Price">
        <TextStyle variation="strong">Completely Free</TextStyle>
      </Card.Section>
      <Card.Section>
        <Button
          primary
          onClick={() => {
            subscribeButton("beta");
          }}
        >
          Subscribe
        </Button>
      </Card.Section>
    </Card>
  );

  const fakePlan = (
    <Card title="xxxxxxx" subdued={true}>
      <Card.Section>
        <TextStyle variation="subdued">------</TextStyle>
      </Card.Section>
      <Card.Section title="Features">
        <p>XXX</p>
        <br />
        <br />
        <br />
      </Card.Section>
      <Card.Section title="Price">
        <TextStyle variation="subdued">To be confirmed</TextStyle>
      </Card.Section>
      <Card.Section>
        <Button
          disabled
          onClick={() => {
            subscribeButton("full");
          }}
        >
          Subscribe
        </Button>
      </Card.Section>
    </Card>
  );

  const fullPlan = (
    <Card title="Full" subdued={true}>
      <Card.Section>
        <TextStyle variation="subdued">Proposed Full Price</TextStyle>
      </Card.Section>
      <Card.Section title="Features">
        <p>Up to 50 product sets</p>
        <br />
        <br />
        <br />
      </Card.Section>
      <Card.Section title="Price">
        <TextStyle variation="subdued">To be confirmed</TextStyle>
      </Card.Section>
      <Card.Section>
        <Button
          disabled
          onClick={() => {
            subscribeButton("full");
          }}
        >
          Subscribe
        </Button>
      </Card.Section>
    </Card>
  );

  const propPlan = (
    <Card title="Pro" subdued={true}>
      <Card.Section>
        <TextStyle variation="subdued">
          Proposed Pro Price - for larger stores
        </TextStyle>
      </Card.Section>
      <Card.Section title="Features">
        <p>Unlimited number of product sets</p>
        <br />
        <br />
        <br />
      </Card.Section>
      <Card.Section title="Price">
        <TextStyle variation="subdued">To be confirmed</TextStyle>
      </Card.Section>
      <Card.Section>
        <Button
          disabled
          onClick={() => {
            subscribeButton("pro");
          }}
        >
          {" "}
          Subscribe{" "}
        </Button>
      </Card.Section>
    </Card>
  );

  const loadingLayout = (
    <Frame>
      <Loading />
    </Frame>
  );

  return (
    <Page title="Choose a plan">
      {loading ? loadingLayout : null}
      <Layout>
        <Layout.Section oneThird>{betaPlan}</Layout.Section>
        <Layout.Section oneThird>{fakePlan}</Layout.Section>
        <Layout.Section oneThird>{fakePlan}</Layout.Section>
      </Layout>
    </Page>
  );
};

export default Billing;
