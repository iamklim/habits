import React, { useEffect } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { AppNavigator } from "./components/AppNavigator";
import { MaterialCommunityIconsPack } from "./components/components/MaterialCommunityIcon";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store";
import AppWrapper from "./components/AppWrapper";

let persistor = persistStore(store);

export default function App() {
  useEffect(() => {
    persistor.purge();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={MaterialCommunityIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppWrapper>
              <AppNavigator />
            </AppWrapper>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}
