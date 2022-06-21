import AppUpdates from "./components/AppUpdates";
import Storage from "./components/Storage";
import Provider from "./context/Provider";
import AppWrapper from "./navigations";

export default function App() {
  return (
    <Provider>
      <Storage />
      {/* <AppUpdates /> */}
      <AppWrapper />
    </Provider>
  );
}
