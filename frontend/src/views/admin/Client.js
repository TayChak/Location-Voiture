import React from "react";

// components

import CardClient from "components/Cards/CardClient.js";

export default function Client() {
  return (
    <>
      <div className="flex flex-wrap mt-32">
        {/* <div className="w-full mb-12 px-4">
          <CardCar />
        </div> */}
         <div className="w-full mb-12 px-4">
          <CardClient color="dark" />
        </div> 
      </div>
    </>
  );
}
