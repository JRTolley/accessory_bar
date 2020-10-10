import { Provider } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/polaris";
// import { Component } from "react";
import translations from "@shopify/polaris/locales/en.json";
import Cookies from "js-cookie";
import App from "next/app";
import "@shopify/polaris/dist/styles.css";
import React from "react";
import ClientRouter from "../components/ClientRouter";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <Provider
        config={{
          apiKey: "18418c246eba8f2725f102ea503e9fe0",
          shopOrigin: shopOrigin,
          forceRedirect: true,
        }}
      >
        <AppProvider i18n={translations}>
          <ClientRouter />
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    );
  }
}

export default MyApp;
