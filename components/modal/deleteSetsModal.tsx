import { Modal, TextContainer, TextStyle } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  deleteSets: () => void;
}

const DeleteSetsModal: React.FC<Props> = ({
  active,
  setActive,
  deleteSets,
}) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        onClose={closeModal}
        open={active}
        title="Confirm Deletion of Accessory Sets"
        primaryAction={{
          content: "Confirm",
          onAction: deleteSets,
        }}
        secondaryActions={[
          {
            content: "Close",
            onAction: closeModal,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              This will <TextStyle variation="strong">Permanently</TextStyle>{" "}
              delete your accessory sets
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default DeleteSetsModal;
