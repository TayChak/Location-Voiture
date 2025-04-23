import React from "react";

// components

import CardReservations from "components/Cards/CardReservations";

export default function Voitures() {
  return (
    <>
      <div className="flex flex-wrap mt-32">
        {/* <div className="w-full mb-12 px-4">
          <CardReservations />
        </div> */}
         <div className="w-full mb-12 px-4">
          <CardReservations color="dark" />
        </div>  
      </div>
    </>
  );
}
