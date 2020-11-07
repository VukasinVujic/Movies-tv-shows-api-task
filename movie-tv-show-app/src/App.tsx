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
  const [isMovie, setIsMovie] = useState(false);

  // api key a7591b103e58fc4674393468dd6a570b

  const showTop10 = async (arg = isMovie) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${
        arg ? "movie" : "tv"
      }/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1`
    );
    const responseArray: [] = response.data.results;
    if (!arg) {
      responseArray.forEach((element) => {
        element["title"] = element["name"];
      });
    }
    const top10 = responseArray.slice(0, 10);
    setDataArray(top10);
  };

  useEffect(() => {
    showTop10();
  }, []);

  var showContent = () => {
    // if user didn't clik on any movie/tv-show , show all the movies
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
      // when you write in search and immediately click on picture of movie/tv-show, cancle search
      clearTimeout(timer);
      let item = dataArray[itemIndex] as Movie;
      return (
        <CardDetail
          // for the back button
          onClick={() => setItemIndex(-1)}
          title={item.title}
          image={
            "https://image.tmdb.org/t/p/w220_and_h330_face" + item.poster_path
          }
          text={item.overview}
          isMovie={isMovie}
          id={item.id}
        />
      );
    }
  };

  const makeSearch = (
    argIsMovie: boolean = isMovie,
    argString: string = ""
  ) => {
    // check if you switch from movies button to tv-show buttons, if did, change isMovie to opposite,
    if (argIsMovie !== isMovie) {
      setIsMovie(argIsMovie);
    }

    if (argString.length > 3) {
      timer = setTimeout(async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${
            argIsMovie ? "movie" : "tv"
          }?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&query=${argString}&page=1&include_adult=false`
        );
        const responseArray: [] = response.data.results;
        if (!argIsMovie) {
          responseArray.forEach((element) => {
            element["title"] = element["name"];
          });
        }
        setDataArray(responseArray);
      }, 1000);
    } else {
      showTop10(argIsMovie);
    }
  };

  const changeOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    let inputString = (event.target as HTMLInputElement).value;
    makeSearch(isMovie, inputString);
    setQueryParam(inputString);
  };

  var showSearch = () => {
    if (itemIndex < 0) {
      return (
        <div>
          <button
            className="main-button"
            style={{ background: isMovie ? "blue" : "white" }}
            onClick={() => makeSearch(true, queryParam)}
          >
            Movies
          </button>
          <button
            className="main-button"
            style={{ background: isMovie ? "white" : "blue" }}
            onClick={() => makeSearch(false, queryParam)}
          >
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
                value={queryParam}
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
