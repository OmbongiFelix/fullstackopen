import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick = {props.name} > {props.text} </button>
  )
  

}

const StatisticLine = (props) => {
  const all = props.good + props.neutral + props.bad
  return(
    <p> {props.text} </p>
  )
}


const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0){
    return (
      <p>No feedback given</p>
    )
  } 
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) /all
  const positive = ((props.good/all) * 100).toFixed(12)
  console.log(positive)
  return(
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all} </p>
      <p>average {average} </p>
      <p>positive {positive}%</p>
    </div>
  )
}

const Display = () => <h1>give feedback</h1>

const App = (props) => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    setGood(good + 1)
    console.log("good clicked")
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    console.log("netral clicked")
  }
  
  const handleBad = () => {
    setBad(bad + 1)
    console.log("bad clicked")
  }
  

  return (
    <div>
      <Display />
      <Button name = {handleGood} text= "good" />
      <Button name = {handleNeutral} text= "neutral" />
      <Button name = {handleBad} text= "bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App