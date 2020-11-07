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

  const showTop10 = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${
        isMovie ? "movie" : "tv"
      }/top_rated?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&page=1`
    );
    const responseArray: [] = response.data.results;
    if (!isMovie) {
      responseArray.forEach((element) => {
        element["title"] = element["name"];
      });
    }
    const top10 = responseArray.slice(0, 10);
    setDataArray(top10);
  };

  useEffect(() => {
    showTop10();
  }, [isMovie]);

  var showContent = () => {
    // console.log({ itemIndex });
    // console.log(dataArray[itemIndex]);
    // console.log(dataArray);

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

  const makeSearch = (
    argIsMovie: boolean = isMovie,
    argString: string = ""
  ) => {
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
        console.log("inside timeout");
        const responseArray: [] = response.data.results;
        if (!argIsMovie) {
          responseArray.forEach((element) => {
            element["title"] = element["name"];
          });
        }
        setDataArray(responseArray);
      }, 1000);
    } else {
      showTop10();
    }
  };

  const changeOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value.length);

    clearTimeout(timer);
    let inputString = (event.target as HTMLInputElement).value;

    // if ((event.target as HTMLInputElement).value.length > 3) {
    //   timer = setTimeout(async () => {
    //     const response = await axios.get(
    //       `https://api.themoviedb.org/3/search/${
    //         isMovie ? "movie" : "tv"
    //       }?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US&query=${
    //         (event.target as HTMLInputElement).value
    //       }&page=1&include_adult=false`
    //     );

    //     console.log("inside timeout");
    //     // console.log(response);
    //     const responseArray: [] = response.data.results;
    //     if (!isMovie) {
    //       responseArray.forEach((element) => {
    //         element["title"] = element["name"];
    //       });
    //     }
    //     setDataArray(responseArray);
    //   }, 1000);
    // } else {
    //   showTop10();
    // }
    makeSearch(undefined, inputString);
    setQueryParam((event.target as HTMLInputElement).value);
  };

  // const changeAndSearch = (movieOrNot: boolean) => {
  //   setIsMovie(movieOrNot);
  //   changeOutput();
  // };

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
