import React from "react";

interface Props {
  title: string;
  image: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class CardView extends React.Component<Props> {
  render() {
    return (
      <div className="cardView" onClick={this.props.onClick}>
        <img alt="not loaded" src={this.props.image}></img>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default CardView;
