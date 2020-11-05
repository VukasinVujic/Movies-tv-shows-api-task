import React from "react";
import CardView from "./components/CardView";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <div>
      <h1>NASLOV</h1>
      <button className="main-button">Movies</button>
      <button className="main-button">Tv Shows</button>
      <form action="" className="form-container">
        <input type="text" />
      </form>

      <CardView />
      {/* <CardDetail /> */}
    </div>
  );
}

export default App;
