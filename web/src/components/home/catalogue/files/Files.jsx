import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { client } from "../../../../client";
import Item from "../fields/Item";
import Preview from "./Preview";
import { useCatalogue } from "../../../../context";
import { useNavigate } from "react-router-dom";

const Files = () => {
  const { drawings, items: s, mode, back, setBack } = useCatalogue();
  const [selected, setSelected] = useState();
  const [items, setItems] = useState([]);
  const [selections, setSelections] = useState([]);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");

  const navigate = useNavigate();

  const fetchWithNumber2 = (number) => {
    const type = number.length > 3 ? "sapNumber" : "hookupNo";
    let item;
    if (type == "sapNumber") {
      item = s.find((item) => item.sapNumber == number);
    } else {
      item = s.find((item) => item.hookupNo == number);
    }

    return item;
  };

  useEffect(() => {
    if (back) {
      const list = back.itemsNumbers
        .map((item) => fetchWithNumber2(item))
        .filter((item) => item != undefined);
      setItems(list);
      setSelected(back);
    }
  }, []);

  useEffect(() => {
    setSelections([...drawings]);
  }, [drawings]);

  const change = (e) => {
    const { value } = e.target;
    setField(value);
    if (!value) {
      setSelections([...drawings]);

      return;
    }

    let found = [];
    drawings.forEach((d) => {
      Object.entries(d).forEach((entry) => {
        const type = entry[0];
        if (
          type == "_id" ||
          type == "_createdAt" ||
          type == "_rev" ||
          type == "_type" ||
          type == "_updatedAt" ||
          type == "pdf" ||
          type == "description" ||
          type == "itemsNumbers" ||
          type == "_rev" ||
          type == "imageurl"
        ) {
          return;
        }

        if (entry[1].toLowerCase().includes(value.toLowerCase())) {
          found.push({ type: entry[0], drawing: d });
        }
      });
    });

    const firstSelection = found.map((d) => {
      return {
        ...d.drawing,
        searchName: `Drawing --> ${d.type} ---> ${d.drawing.drawingName}`,
      };
    });

    found = [];
    s.forEach((item) => {
      Object.entries(item).forEach((entry) => {
        const type = entry[0];
        if (
          type == "_id" ||
          type == "_createdAt" ||
          type == "_rev" ||
          type == "_type" ||
          type == "_updatedAt" ||
          type == "imageurl" ||
          type == "itemDescription" ||
          type == "AVME"
        ) {
          return;
        }

        if (entry[1].toLowerCase().includes(value.toLowerCase())) {
          found.push({ type: entry[0], item: item });
        }
      });
    });

    const newSelection = found.map((item) => {
      return {
        ...item.item,
        searchName: `Material --> ${item.type} ---> ${item.item.materialName}`,
      };
    });
    setSelections([...firstSelection, ...newSelection]);
  };
  const select = async (e) => {
    let value = e.target.innerText;

    setOpen(false);
    if (value.split("--->").length > 1) {
      value = value.split("--->")[1].trim();
    }
    if (e.target.innerText.includes("Material")) {
      const find = s.find((item) => item.materialName == value);
      navigate(`/catalogue/items/${find.itemID}`, {
        replace: false,
      });
      return;
    }
    const find = drawings.find((d) => d.drawingName == value);

    const list = find.itemsNumbers
      .map((item) => fetchWithNumber2(item))
      .filter((item) => item != undefined);

    setItems(list);
    setSelected(find);
    setSelections([...drawings]);
    setField("");
    setBack(find);
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        onClick={() => setOpen(!open)}
        onChange={change}
        label={selected?.drawingName}
        value={field}
        variant="outlined"
        style={{
          width: "100%",
          backgroundColor: mode == "light" ? "white" : "#121212",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      />

      {open &&
        selections.map((drawing, i) => (
          <MenuItem
            style={{
              width: "100%",
              backgroundColor: mode == "light" ? "white" : "#121212",
              color: mode == "light" ? "black" : "white",
              borderRadius: "3px",
            }}
            onClick={select}
            key={drawing._id + i}
            value={drawing._id}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {drawing.searchName ? drawing.searchName : drawing.drawingName}
          </MenuItem>
        ))}

      <div style={{ marginTop: "10px" }}>
        {items.map(
          (item) =>
            item && (
              <Item
                value={item?.materialName}
                file={selected?._id}
                id={item?.itemID}
              />
            )
        )}
      </div>

      {selected && <Preview selected={selected} />}
    </div>
  );
};

export default Files;
