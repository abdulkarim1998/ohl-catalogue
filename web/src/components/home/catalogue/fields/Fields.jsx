import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BarChartIcon from "@mui/icons-material/BarChart";
import { motion } from "framer-motion";
import { urlFor, client } from "../../../../client";

import "./fields.scss";
import Field from "./Field";
import { useParams } from "react-router-dom";
import { useCatalogue } from "../../../../context";

const Fields = () => {
  const { id } = useParams();

  const { items } = useCatalogue();
  const [selections, setSelections] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelections([...items]);
    if (id) {
      setSelected(items.find((item) => item.itemID == id));
    }
  }, [items]);

  const change = (e) => {
    const { value } = e.target;

    if (!value) {
      setSelections([...items]);

      return;
    }

    const found = [];
    items.forEach((item) => {
      Object.entries(item).forEach((entry) => {
        const type = entry[0];
        if (
          type == "_id" ||
          type == "_createdAt" ||
          type == "_rev" ||
          type == "_type" ||
          type == "_updatedAt" ||
          type == "imageurl" ||
          type == "itemDescription"
        ) {
          return;
        }

        if (entry[1].toLowerCase().includes(value.toLowerCase())) {
          found.push({ type: entry[0], item: item });
        }
      });
    });

    setSelections(
      found.map((item) => {
        return {
          ...item.item,
          searchName: `${item.type} ---> ${item.item.materialName}`,
        };
      })
    );
  };

  const handleOnClick = () => {
    setOpen(!open);
  };

  const select = (e) => {
    let value = e.target.innerText;
    if (value.split("--->").length > 1) {
      value = value.split("--->")[1].trim();
    }
    const find = items.find((item) => item.materialName == value);
    setSelected(find);
    setOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        onClick={handleOnClick}
        onChange={change}
        label={selected?.materialName}
        variant="outlined"
        style={{
          width: "100%",
          backgroundColor: "white",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      />
      {open &&
        selections.map((item, i) => (
          <MenuItem
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "3px",
            }}
            onClick={select}
            key={item._id + i}
            value={item._id}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {item.searchName ? item.searchName : item.materialName}
          </MenuItem>
        ))}

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
