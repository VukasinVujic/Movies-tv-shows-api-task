import React from "react";

interface Props {
  title: string;
  image: string;
}
const CardView = (props: Props) => {
  return (
    <div className="cardView">
      <img alt="" src={props.image}></img>
      <p>{props.title}</p>
    </div>
  );
};

export default CardView;
