import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
// import { Component } from "react";
import translations from "@shopify/polaris/locales/en.json";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: "18418c246eba8f2725f102ea503e9fe0",
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <Component {...pageProps} />
        </Provider>
      </AppProvider>
    );
  }
}

export default MyApp;
