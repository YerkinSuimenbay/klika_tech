import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
// import { Navbar } from "./navigation/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
