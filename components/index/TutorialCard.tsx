import { Layout, MediaCard, VideoThumbnail } from "@shopify/polaris";
import React from "react";

const TutorialCard: React.FC = () => {
  return (
    <Layout.Section>
      <MediaCard
        title="Getting Started"
        primaryAction={{
          content: "Learn how to set up an accessory set",
          onAction: () => {},
        }}
        description="Discover how to use Adder Accessory Bar"
      >
        <VideoThumbnail
          videoLength={87}
          thumbnailUrl="https://img.youtube.com/vi/qSDPi_uYdL4/0.jpg"
          onClick={() => {
            window.open("https://youtu.be/qSDPi_uYdL4");
          }}
        />
      </MediaCard>
    </Layout.Section>
  );
};

export default TutorialCard;
