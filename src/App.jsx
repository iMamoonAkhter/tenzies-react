
import React from 'react';
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid';

function App() {

  const generateAllNewDice = ()=>{
    return new Array(10)
      .fill(0)
      .map(()=> ({ 
                  value: Math.ceil(Math.random()*6),
                  isHeld: false,
                  id: nanoid()
                }))
  }
  const [dice, setDice] = React.useState(generateAllNewDice());
  function rollDice(){
    setDice(generateAllNewDice());
  } 

  const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />)

  return (
    <>
      <main>
        <div className='dice-container'>
          {diceElements}
        </div>

        <button className='roll-dice' onClick={rollDice}>Roll</button>
      </main>
    </>
  )
}

export default App
