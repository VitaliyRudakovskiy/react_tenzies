import React from "react";

export default function Particle(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "#ffffff",
  };

  return (
    <div className='particle' style={styles} onClick={props.holdSquare}>
      <h2>{props.value}</h2>
    </div>
  );
}
