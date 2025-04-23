import React from "react";

// components

import CardReservation from "components/Cards/CardReservation.js";

export default function Client() {
  return (
    <>
      <div className="flex flex-wrap mt-32">
         {/* <div className="w-full mb-12 px-4">
          <CardReservation />
        </div>  */}
         <div className="w-full mb-12 px-4">
          <CardReservation color="dark" />
        </div>
      </div>
    </>
  );
}
