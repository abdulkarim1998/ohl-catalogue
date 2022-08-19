import { useState } from "react";
import "./catalogue.scss";
import Fields from "./fields/Fields";
import { urlFor } from "../../../client";

const Catalogue = () => {
  const [selected, setSelected] = useState([]);
  return (
    <div className="app__c">
      <p className="app__c-logo">OHL-CATALOGUE</p>

      <div className="app__c-fields">
        <Fields selected={selected} setSelected={setSelected} />
        <img
          src={
            selected?.imageurl
              ? urlFor(selected?.imageurl)
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
          alt="ranjo stenja"
        />
      </div>
    </div>
  );
};

export default Catalogue;
