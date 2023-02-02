import React, { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { APIKEY } from "../../../helper/utils.helper";

export default function Address({
  registeringCaregiver,
  className,
  value = "",
  handleChange = () => {},
}) {
  const [data, setData] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: APIKEY,
    onPlaceSelected: (place) => {
      //   console.log(place);
      setData(place?.formatted_address || "");
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "in" },
    },
  });

  useEffect(() => {
    handleChange(data);
  }, [data]);

  return (
    <>
      <div className={className}>
        <input type="text" id="f_name" placeholder=" " required ref={ref} />
        <label htmlFor="f_name">
          {registeringCaregiver && "Member's"} Address
        </label>
      </div>
    </>
  );
}
