import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BarChartIcon from "@mui/icons-material/BarChart";
import { motion } from "framer-motion";
import { urlFor,client } from "../../../../client";

import "./fields.scss";
import Field from "./Field";
import { useParams } from "react-router-dom";

const Fields = () => {

  const {id} = useParams()


  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    const query = '*[_type=="materials"]';
    client
      .fetch(query)
      .then((data) => {
        setItems(data);
        if(id) {
          setSelected(data.find(item => item.itemID == id))
        }
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
        style={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}
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
          <motion.img
          whileHover={{ scale: 1.2 }}
          src={
            selected?.imageurl
              ? urlFor(selected?.imageurl)
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
          alt="ranjo stenja"
        />
    </div>
  );
};

export default Fields;
