import React, { useState, useEffect } from "react";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import { urlFor, client } from "./client";
import "./app.scss";

const defaultImage =
  "https://img.freepik.com/free-vector/flat-tools-collection_1234-41.jpg";

function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState();

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
    return { label: item.materialName, ...item };
  });

  console.log(selection);

  return (
    <div className="App">
      <div className="container">
        <div style={{ width: "70%" }}>
          <Autocomplete
            disablePortal
            id="material-name"
            options={selection}
            onSelect={(e) => {
              const find = items.find(
                (item) => item.materialName == e.target.value
              );
              setSelected(find);
            }}
            fullWidth
            sx={{ width: 600 }}
            renderInput={(params) => (
              <TextField {...params} label="Material Name" />
            )}
          />
          <div className="text-field">
            <InputLabel>Item ID</InputLabel>
            <TextField
              id="text-field-Item-ID"
              variant="outlined"
              value={selected ? selected.itemID : ""}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="text-field">
            <InputLabel>SAP Number</InputLabel>
            <TextField
              id="text-field-Item-ID"
              fullWidth
              value={selected ? selected.sapNumber : ""}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="text-field">
            <InputLabel>Hook up No</InputLabel>

            <TextField
              id="text-field-hookup"
              fullWidth
              value={selected ? selected.hookupNo : ""}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="text-field">
            <InputLabel>Item Description</InputLabel>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              value={selected ? selected.materialDescription : ""}
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

          <div className="text-field">
            <InputLabel>Unit</InputLabel>
            <TextField
              id="text-field-hookup"
              variant="outlined"
              value={selected ? selected.unit : ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="text-field">
            <InputLabel>Remarks</InputLabel>
            <TextField
              fullWidth
              value={selected ? selected.remarks : ""}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div>
          {selected ? (
            <img
              height={400}
              width={400}
              src={selected.imageurl ? urlFor(selected.imageurl) : defaultImage}
            />
          ) : (
            <img height={500} width={500} src={defaultImage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
