import React, { useEffect, useState } from "react";

import axios from "axios";
import CardView from "./components/CardView";
import CardDetail from "./components/CardDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [queryParam, setQueryParam] = useState("");
  const [dataArray, setDataArray] = useState([]);

  // api key a7591b103e58fc4674393468dd6a570b
  // https://api.themoviedb.org/3/tv/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1

  useEffect(() => {
    // setTimeout(() => {
    (async (queryParam) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1`
      );
      const responsArray: [] = response.data.results;
      responsArray.forEach((element) => {
        console.log(element);
      });
      setDataArray(response.data);
    })(queryParam);
    // }, 3000);
  }, [queryParam]);

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
