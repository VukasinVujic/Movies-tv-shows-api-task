import React, { useEffect, useState } from "react";

import axios from "axios";
import CardView from "./components/CardView";
import CardDetail from "./components/CardDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

let timer: NodeJS.Timeout;

interface Movie {
  popularity: Number;
  id: Number;
  video: Boolean;
  vote_count: Number;
  vote_average: Number;
  title: string;
  release_date: string;
  original_language: string;
  original_title: string;
  genre_ids: Array<Number>;
  backdrop_path: string;
  adult: Boolean;
  overview: string;
  poster_path: string;
}

function App() {
  const [queryParam, setQueryParam] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [itemIndex, setItemIndex] = useState(-1);
  const [isMovie, setIsMovie] = useState(true);

  // api key a7591b103e58fc4674393468dd6a570b
  // https://api.themoviedb.org/3/tv/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1

  useEffect(() => {
    (async (queryParam) => {
      var type = isMovie ? "movie" : "tv";
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1`
      );
      const responseArray: [] = response.data.results;
      if (!isMovie) {
        responseArray.forEach((element) => {
          element["title"] = element["name"];
        });
      }
      const top10 = responseArray.slice(0, 10);
      setDataArray(top10);
    })(queryParam);
  }, [isMovie]);

  var showContent = () => {
    // console.log({ itemIndex });
    // console.log(dataArray[itemIndex]);
    console.log(dataArray);

    if (itemIndex < 0) {
      return (
        <div className="center">
          {dataArray.map((value: Movie, index) => {
            return (
              <CardView
                onClick={() => {
                  setItemIndex(index);
                }}
                title={value.title}
                image={
                  "https://image.tmdb.org/t/p/w220_and_h330_face" +
                  value.poster_path
                }
              />
            );
          })}
        </div>
      );
    } else {
      var item = dataArray[itemIndex] as Movie;
      return (
        <CardDetail
          onClick={() => setItemIndex(-1)}
          title={item.title}
          image={
            "https://image.tmdb.org/t/p/w220_and_h330_face" + item.poster_path
          }
          text={item.overview}
        />
      );
    }
  };

  const changeOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);

    clearTimeout(timer);
    timer = setTimeout(async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${
          isMovie ? "movie" : "tv"
        }?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&query=${
          (event.target as HTMLInputElement).value
        }&page=1&include_adult=false`
      );

      console.log("inside timeout");
      // console.log(response);
      const responseArray: [] = response.data.results;
      if (!isMovie) {
        responseArray.forEach((element) => {
          element["title"] = element["name"];
        });
      }
      setDataArray(responseArray);
    }, 1000);
  };

  var showSearch = () => {
    if (itemIndex < 0) {
      return (
        <div>
          <button className="main-button" onClick={() => setIsMovie(true)}>
            Movies
          </button>
          <button className="main-button" onClick={() => setIsMovie(false)}>
            Tv Shows
          </button>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="form-container"
          >
            <span>
              <FontAwesomeIcon
                icon={faSearch}
                className="icon-class"
              ></FontAwesomeIcon>
            </span>
            <span>
              <input
                type="text"
                className="input-class"
                placeholder="search"
                onChange={(event) => changeOutput(event)}
              />
            </span>
          </form>
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="big-container">
      {showSearch()}
      {showContent()}
    </div>
  );
}

export default App;
