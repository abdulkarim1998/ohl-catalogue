import { useRef, useState } from "react";
import "./App.css";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Tabs,
  Modal,
  Text,
} from "@mantine/core";
import { HeaderAction } from "./components/Header";
import { IconToolsKitchen, IconWriting } from "@tabler/icons";
import Drawings from "./components/Drawings";
import Materials from "./components/Materials";
import Provider from "./context/context";
import Fuse from "./Fuse";
import DisplayModal from "./components/DisplayModal";

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
            <Fuse />
            <HeaderAction />
            <div style={{ display: "flex" }}>
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
                    <Materials topRef={topRef} />
                  </Tabs.Panel>
                  <Tabs.Panel value="drawings">
                    {/* <Drawings /> */}
                    <Text variant="text"> Coming Soon </Text>
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
            <DisplayModal />
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </Provider>
  );
}

export default App;
