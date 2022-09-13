import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { client } from "../../../../client";
import Item from "../fields/Item";
import Preview from "./Preview";
import { useCatalogue } from "../../../../context";

const fetchWithNumber = async (number) => {
  var item;
  const type = number.length > 3 ? "sapNumber" : "hookupNo";
  const query = `*[_type=="materials" && ${type} == "${number}"]`;
  const result = await client.fetch(query);
  return result[0];
};

const Files = () => {
  const { drawings, items: s } = useCatalogue();

  const [selected, setSelected] = useState();
  const [items, setItems] = useState([]);
  const [selections, setSelections] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelections([...drawings]);
  }, [drawings]);

  const change = (e) => {
    const { value } = e.target;

    if (!value) {
      setSelections([...drawings]);

      return;
    }

    const found = [];
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
          type == "itemsNumbers"
        ) {
          return;
        }

        if (entry[1].toLowerCase().includes(value.toLowerCase())) {
          found.push({ type: entry[0], drawing: d });
        }
      });
    });

    setSelections(
      found.map((d) => {
        return {
          ...d.drawing,
          searchName: `${d.type} ---> ${d.drawing.drawingName}`,
        };
      })
    );
  };

  const select = async (e) => {
    let value = e.target.innerText;
    setOpen(false);
    if (value.split("--->").length > 1) {
      value = value.split("--->")[1].trim();
    }
    const find = drawings.find((d) => d.drawingName == value);
    let promises = [];
    find.itemsNumbers.forEach((number) => {
      promises.push(fetchWithNumber(number));
    });

    const results = await Promise.all(promises);
    setItems(results);
    setSelected(find);
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        onClick={() => setOpen(!open)}
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
        selections.map((drawing, i) => (
          <MenuItem
            style={{
              width: "100%",
              backgroundColor: "white",
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

      {items.map(
        (item) => item && <Item value={item?.materialName} id={item?.itemID} />
      )}

      {selected && <Preview selected={selected} />}
    </div>
  );
};

export default Files;
