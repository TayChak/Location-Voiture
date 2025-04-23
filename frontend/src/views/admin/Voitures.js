import React from "react";

// components

import CardVoiture from "components/Cards/CardVoiture";

export default function Voitures() {
  return (
    <>
      <div className="flex flex-wrap mt-32">
        {/* <div className="w-full mb-12 px-4">
          <CardCar />
        </div> */}
         <div className="w-full mb-12 px-4">
          <CardVoiture color="dark" />
        </div> 
      </div>
    </>
  );
}
