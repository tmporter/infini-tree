import { UserContextProvider } from "../contexts/UserContext";
import ThemeProvider from "./ThemeProvider";
import TreeMap from "./TreeMap";

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider>
        <div className="App">
          <TreeMap />
        </div>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
