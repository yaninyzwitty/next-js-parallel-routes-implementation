import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function PhotoIdPage({params: {id}}: Props) {
  return <div className="flex items-start">PhotoIdPage {id} true </div>;
}

export default PhotoIdPage;
