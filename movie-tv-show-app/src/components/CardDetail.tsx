import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  image: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardDetail = (props: Props) => {
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
        <img alt="" src={props.image}></img>
        <p className="title">{props.title}</p>
        {/*<p> Overview </p>*/}
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default CardDetail;
