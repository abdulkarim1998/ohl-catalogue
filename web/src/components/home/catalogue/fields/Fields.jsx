import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
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
        Icon={AccessibilityIcon}
        fieldName="Material Name"
        value={selected?.materialName}
      />
      <Field
        Icon={AccessibilityIcon}
        fieldName="Item ID"
        value={selected?.itemID}
      />
      <Field
        Icon={AccessibilityIcon}
        fieldName="Hookup Number"
        value={selected?.hookupNo}
      />
      <Field
        Icon={AccessibilityIcon}
        fieldName="Sap Number"
        value={selected?.sapNumber}
      />
      <Field Icon={AccessibilityIcon} fieldName="unit" value={selected?.unit} />
      <Field
        Icon={AccessibilityIcon}
        fieldName="Material Description"
        value={selected?.materialDescription}
      />
    </div>
  );
};

export default Fields;
