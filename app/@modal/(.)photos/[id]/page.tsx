import Frame from "@/components/frame";
import Modal from "@/components/modal";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function PhotoIdPage({params: {id}}: Props) {
  return (
    <Modal>
      <Frame id={id} />
    </Modal>
  );
}

export default PhotoIdPage;
