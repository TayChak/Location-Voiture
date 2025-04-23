import React from "react";

// components

import CardAddAdmin from "components/Cards/CardAddAdmin";

export default function AddAdmin() {
  return (
    <>
      <div className="flex flex-wrap">
      <div className="flex flex-wrap mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardAddAdmin />
          </div>
        </div>
      </div>
    </>
  );
}