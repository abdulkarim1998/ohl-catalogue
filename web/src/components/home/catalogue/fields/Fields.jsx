import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BarChartIcon from "@mui/icons-material/BarChart";

import { client } from "../../../../client";

import "./fields.scss";
import Field from "./Field";

const Fields = ({ selected, setSelected }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = '*[_type=="materials"]';

    client
      .fetch(query)
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selection = items.map((item) => {
    return { label: item.materialName, id: item._id };
  });

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        disablePortal
        style={{ width: "100%" }}
        id="combo-box-demo"
        options={selection}
        onSelect={(e) => {
          const find = items.find(
            (item) => item.materialName == e.target.value
          );
          setSelected(find);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item" />}
      />

      <Field
        Icon={CategoryIcon}
        fieldName="Material Name"
        value={selected?.materialName}
      />
      <Field
        Icon={FeaturedPlayListIcon}
        fieldName="Item ID"
        value={selected?.itemID}
      />
      <Field
        Icon={ConfirmationNumberIcon}
        fieldName="Hookup Number"
        value={selected?.hookupNo}
      />
      <Field
        Icon={ConfirmationNumberIcon}
        fieldName="Sap Number"
        value={selected?.sapNumber}
      />
      <Field Icon={BarChartIcon} fieldName="unit" value={selected?.unit} />
      <Field
        Icon={DescriptionIcon}
        fieldName="Material Description"
        value={selected?.materialDescription}
      />
    </div>
  );
};

export default Fields;
