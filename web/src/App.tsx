import { useEffect, useRef, useState } from "react";
import "./App.css";
import { NavbarMinimal } from "./components/Navbar";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Pagination,
  Tabs,
} from "@mantine/core";
import { HeaderAction } from "./components/Header";
import { Grid } from "@mantine/core";
import ItemCard from "./components/ItemCard";
import { client } from "./client";
import { Drawing, Material } from "./types/types";
import { IconToolsKitchen, IconWriting } from "@tabler/icons";
import DrawingCard from "./components/DrawingCard";
import Drawings from "./components/Drawings";
import Materials from "./components/Materials";
import Provider from "./context/context";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const topRef = useRef(null);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <Provider>
      <div className="App" ref={topRef}>
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
              <div style={{ marginTop: "5px" }}>
                <Tabs defaultValue="materials" style={{ marginBottom: 10 }}>
                  <Tabs.List>
                    <Tabs.Tab value="materials" icon={<IconToolsKitchen />}>
                      Materials
                    </Tabs.Tab>
                    <Tabs.Tab value="drawings" icon={<IconWriting />}>
                      Drawings
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="materials">
                    <Materials />
                  </Tabs.Panel>
                  <Tabs.Panel value="drawings">
                    <Drawings />
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </Provider>
  );
}

export default App;
