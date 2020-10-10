import { Heading, Page } from "@shopify/polaris";
import { useEffect } from "react";
import axios from "axios";

const Index = () => {
  useEffect(() => {
    async function queryApi() {
      const res = await axios.get("/api/hello");
      console.log(res);
    }
    queryApi();
  });

  return (
    <Page>
      <Heading>It works!</Heading>
    </Page>
  );
};
export default Index;
