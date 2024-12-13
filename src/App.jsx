
import React from 'react';
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
function App() {
  const buttonRef = React.useRef(null);

  const generateAllNewDice = ()=>{
    return new Array(10)
      .fill(0)
      .map(()=> ({ 
                  value: Math.ceil(Math.random()*6),
                  isHeld: false,
                  id: nanoid()
                }))
  }
  const [dice, setDice] = React.useState(()=>generateAllNewDice());
  
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  React.useEffect(()=> {
    if(gameWon){
      buttonRef.current.focus();
    }
  }, [gameWon])
  
  function rollDice() {
    if(!gameWon){
      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld
            ? die // Return the original die if it is held
            : { ...die, value: Math.ceil(Math.random() * 6) } // Update the value if not held
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id){
    setDice(oldDice => oldDice.map(die => die.id === id ?
          {...die, isHeld: !die.isHeld}:
          die
      )
    )
  }


  const diceElements = dice.map(dieObj =>
           <Die  
              key={dieObj.id} 
              value={dieObj.value} 
              isHeld={dieObj.isHeld}
              hold={()=> hold(dieObj.id)}
             />)

  return (
      <main>
        {gameWon && <ReactConfetti />}
        <div>
          {gameWon && <p>Congratulation! You won! Press "New Game" to start again</p>}
        </div>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
        <div className='dice-container'>
          {diceElements}
        </div>

        <button ref={buttonRef} className='roll-dice' onClick={rollDice}>
          {gameWon ? "New Game":"Roll"}
        </button>
      </main>
    
  )
}

export default App
