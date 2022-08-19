import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { urlFor, client } from "../../../../client";

import "./fields.scss";
import Field from "./Field";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const Fields = () => {
  const [item, setItems] = useState([]);

  useEffect(() => {
    const query = '*[_type=="materials"]';

    client
      .fetch(query)
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        disablePortal
        style={{ width: "100%" }}
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
      <Field Icon={AccessibilityIcon} fieldName="Test" value="Test" />
    </div>
  );
};

export default Fields;
