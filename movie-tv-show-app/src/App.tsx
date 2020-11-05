import React from "react";
import CardView from "./components/CardView";
import CardDetail from "./components/CardDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="big-container">
      <button className="main-button">Movies</button>
      <button className="main-button">Tv Shows</button>
      <form action="" className="form-container">
        <span>
          <FontAwesomeIcon
            icon={faSearch}
            className="icon-class"
          ></FontAwesomeIcon>
        </span>
        <span>
          <input type="text" className="input-class" placeholder="search" />
        </span>
      </form>

      <div className="center">
        <CardView
          title="Najjači film ove godine"
          image="https://opusteno.rs/slike/2006/09/najvise-nervira-na-netu-841/najvise-nervira-na-netu-tv.jpg"
        />
        <CardView
          title="Najjači film ove godine"
          image="https://opusteno.rs/slike/2006/09/najvise-nervira-na-netu-841/najvise-nervira-na-netu-tv.jpg"
        />
        <CardView
          title="Najjači film ove godine"
          image="https://opusteno.rs/slike/2006/09/najvise-nervira-na-netu-841/najvise-nervira-na-netu-tv.jpg"
        />
        <CardView
          title="Najjači film ove godine"
          image="https://opusteno.rs/slike/2006/09/najvise-nervira-na-netu-841/najvise-nervira-na-netu-tv.jpg"
        />
      </div>
      <CardDetail
        title="Najjači film ove godine"
        image="https://opusteno.rs/slike/2006/09/najvise-nervira-na-netu-841/najvise-nervira-na-netu-tv.jpg"
        text="Fusce commodo.  Vestibulum convallis, lorem a tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae lacus.  Nullam libero mauris, consequat quis, varius et, dictum id, arcu.  Mauris mollis tincidunt felis.  Aliquam feugiat tellus ut neque.  Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.  Aliquam erat volutpat.  Nunc eleifend leo vitae magna.  In id erat non orci commodo lobortis.  Proin neque massa, cursus ut, gravida ut, lobortis eget, lacus.  Sed diam.  Praesent fermentum tempor tellus."
      />
    </div>
  );
}

export default App;
