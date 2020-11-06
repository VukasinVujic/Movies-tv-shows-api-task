import React from "react";

interface Props {
  title: string;
  image: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardDetail = (props: Props) => {
  return (
    <div className="cardDetailOuter">
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
