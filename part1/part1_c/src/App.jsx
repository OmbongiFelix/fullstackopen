import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick = {props.name} > {props.text} </button>
  )
}

const StatisticLine = (props) => {
  return(
    
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td> {props.value} </td>
        </tr>
      </tbody>    
  )
}
//<p> {props.text} {props.value}</p>

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

      <StatisticLine text = "good"  value = {props.good} />
      <StatisticLine text = "neutral"  value = {props.neutral} />
      <StatisticLine text = "bad"  value = {props.bad} />
      <StatisticLine text = "all"  value = {all} />
      <StatisticLine text = "average"  value = {average} />
      <StatisticLine text = "positive"  value = {positive} /> 
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
      <table>
        <tr>
          <th>  </th>
          <th>  </th>
        </tr>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
      </table>
    </div>
  )
}

export default App