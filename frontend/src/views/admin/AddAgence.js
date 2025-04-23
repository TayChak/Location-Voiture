import React from "react";

// components

import CardAddAgence from "components/Cards/CardAddAgence";

export default function AddAgence() {
  return (
    <>
      <div className="flex flex-wrap">
      <div className="flex flex-wrap mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardAddAgence />
          </div>
        </div>
      </div>
    </>
  );
}