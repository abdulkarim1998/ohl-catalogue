import { useEffect, useState } from "react";
import "./App.css";
import { NavbarMinimal } from "./components/Navbar";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { HeaderAction } from "./components/Header";
import { Grid } from "@mantine/core";
import ItemCard from "./components/MediaCard";
import { client } from "./client";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const [materials, setMaterials] = useState<any[]>([]);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  useEffect(() => {
    const query = '*[_type=="materials"]';
    client
      .fetch(query)
      .then((data: any) => {
        console.log(data);

        setMaterials(data);
      })
      .catch((err: unknown) => console.log(err));
  }, []);

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <HeaderAction />
          <div style={{ display: "flex" }}>
            <NavbarMinimal />

            <div style={{ margin: "5px" }}></div>
            <Grid>
              {materials.map((m) => (
                <Grid.Col sm={6} md={4}>
                  <ItemCard photoSrc={m.imageurl} />
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
