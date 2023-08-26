import "./App.css";

import Home from "pages/Home/Home";
import HomeProvider from "context/HomeContext";

function App() {
  return (
    <div className="App">
      <HomeProvider>
        <Home />
      </HomeProvider>
    </div>
  );
}

export default App;
