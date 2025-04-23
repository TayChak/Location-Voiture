import React from "react";

import CardVoiture from "components/Cards/CardVoiture";

export default function Voiture() {
  return (
    <>
      <div className="flex flex-wrap mt-24">
        <div className="w-full mb-12 px-4">
          <CardVoiture color="dark" />
        </div>
      </div>
    </>
  );
}
