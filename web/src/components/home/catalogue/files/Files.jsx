import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { client } from "../../../../client";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import Item from "../fields/Item";

const fetchWithNumber = async (number) => {
  var item;
  const type = number.length > 3 ? "sapNumber" : "hookupNo";
  const query = `*[_type=="materials" && ${type} == "${number}"]`;
  const result = await client.fetch(query);
  return result[0];
};

const Files = () => {
  const [drawings, setDrawings] = useState([]);
  const [selected, setSelected] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = '*[_type=="drawings"]';
    client
      .fetch(query)
      .then((data) => {
        setDrawings(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selection = drawings.map((item) => {
    return { label: item.drawingName, id: item._id };
  });

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        disablePortal
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        id="combo-box-demo"
        options={selection}
        onSelect={async (e) => {
          const find = drawings.find(
            (item) => item.drawingName == e.target.value
          );
          let promises = [];
          find.itemsNumbers.forEach((number) => {
            promises.push(fetchWithNumber(number));
          });

          const results = await Promise.all(promises);
          setItems(results);
          setSelected(find);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Drawings" />}
      />
      {items.map((item) => ( item &&
        <Item
          value={item?.materialName}
          id={item?.itemID}
        />
      ))}
    </div>
  );
};

export default Files;
