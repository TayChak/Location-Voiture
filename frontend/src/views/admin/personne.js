import React from "react";

// components

/* import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js"; */
import CardPersonne from "components/Cards/CardPersonne";
export default function personne() {
  return (
    <>
      <div className="flex flex-wrap mt-32">
          <div className="w-full mb-12 px-4">
                  <CardPersonne color="dark" />
                </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}
