import React from "react";

type Props = {
  id: string;
};

function Frame({id}: Props) {
  return (
    <div className="bg-emerald-300 text-white text-2xl p-4">
      This has an id of:
      {id}
    </div>
  );
}

export default Frame;
