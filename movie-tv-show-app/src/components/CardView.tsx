import React from "react";

interface Props {
  title: string;
  image: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const CardView = (props: Props) => {
  return (
    <div className="cardView" onClick={props.onClick}>
      <img alt="" src={props.image}></img>
      <p>{props.title}</p>
    </div>
  );
};

export default CardView;
