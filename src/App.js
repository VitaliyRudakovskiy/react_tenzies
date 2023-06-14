import React from "react";
import Particle from "./components/Particle";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  const [square, setSquare] = React.useState(generateParticles());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = square.every((tile) => tile.isHeld === true);
    const firstValue = square[0].value;
    const allSameValues = square.every((tile) => tile.value === firstValue);

    if (allHeld && allSameValues) {
      setTenzies(true);
    }
  }, [square]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 1 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateParticles() {
    const particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push(generateNewDie());
    }
    return particles;
  }

  function rollSquares() {
    if (!tenzies) {
      setSquare((prevSquare) =>
        prevSquare.map((item) => {
          return item.isHeld ? item : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setSquare(generateParticles());
    }
  }

  function holdSquare(id) {
    setSquare((prevSquare) =>
      prevSquare.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  function playNewGame() {
    setSquare(generateNewDie());
  }

  const particlesArray = square.map((item) => (
    <Particle
      value={item.value}
      key={item.id}
      isHeld={item.isHeld}
      holdSquare={() => holdSquare(item.id)}
    />
  ));

  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <div className='container'>
          <h1>Tenzies</h1>
          <h3>
            Roll until all squares are the same. Click each square to freeze it
            at its current value between rolls.
          </h3>
          <div className='particles-container'>{particlesArray}</div>
          <button className='roll-button' onClick={rollSquares}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
    </>
  );
};

export default App;
