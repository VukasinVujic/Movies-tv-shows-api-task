import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Props {
  title: string;
  image: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isMovie: Boolean;
  id: Number;
}

const CardDetail = (props: Props) => {
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${props.isMovie ? "movie" : "tv"}/${
          props.id
        }/videos?api_key=a7591b103e58fc4674393468dd6a570b&language=en-US`
      );
      const responseArray = response.data.results;
      if (responseArray !== undefined && responseArray.length > 0) {
        setVideoKey(responseArray[0].key);
      }
    })();
  });

  const giveVideoOrImg = () => {
    if (videoKey) {
      return (
        <iframe
          src={`//www.youtube.com/embed/${videoKey}?autoplay=1`}
          allowFullScreen
          title={videoKey}
        ></iframe>
      );
    } else {
      return <img alt="" src={props.image}></img>;
    }
  };

  return (
    <div className="cardDetailOuter">
      <span>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="icon-class"
        ></FontAwesomeIcon>
      </span>
      <button onClick={props.onClick}> Back </button>
      <div className="cardDetail">
        {giveVideoOrImg()}
        <p className="title">{props.title}</p>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default CardDetail;
