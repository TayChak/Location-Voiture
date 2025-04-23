import React from "react";

// components

/* import CardTable from "components/Cards/CardAgence"; */
import CardAgence from "components/Cards/CardAgence";

export default function Agence() {
  return (
    <>
       <div className="flex flex-wrap mt-24">
        {/*<div className="w-full mb-12 px-4">
          <CardAgence />
        </div> */}
         <div className="w-full mb-4 mt-8 px-14">
          <CardAgence color="dark" />
        </div> 
      </div>
    </>
  );
}
