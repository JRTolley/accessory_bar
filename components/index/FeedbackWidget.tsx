import { Button, Form, FormLayout, Layout, TextField } from "@shopify/polaris";
import Axios from "axios";
import { set } from "js-cookie";
import React, { useState } from "react";

const FeedbackWidget: React.FC = () => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Layout.AnnotatedSection
      title="Feedback Form"
      description="Found a bug? Want a feature?  Or just want to say thanks? 
      - Use this form to send an email straight to us"
    >
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Feedback Form"
            value={value}
            onChange={(input) => {
              setValue(input);
            }}
            multiline={4}
          />
          <TextField
            label="Contact Email"
            value={email}
            onChange={(input) => {
              setEmail(input);
            }}
            type="email"
          />
          <Button submit textAlign="right">
            Submit
          </Button>
        </FormLayout>
      </Form>
    </Layout.AnnotatedSection>
  );

  async function handleSubmit(input) {
    console.log("Handle Submit submitted: ", input);
    setValue("Thank you for your message, we will be with you shortly");
    await Axios.post("/api/util/feedback", { message: value, email });
    return;
  }
};

export default FeedbackWidget;
