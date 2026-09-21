import { useState } from 'react'


const Name = ({ person }) => {

  return <li>{person.name} {person.number}</li>
}

const Filter = (props) => {
  const matches = props.persons.filter(person =>
    person.name.toLowerCase().startsWith(props.searchTerm.toLowerCase())
  )
  return (
    <ul>
      {matches.map(match => (
            <Name key={match.name} person={match} />   
          ))}
    </ul>
  )
}


const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(person => (
        <Name key={person.name} person={person} />   
      ))}
    </ul>
  )
  
        
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange} />

      <div>number: <input type='number' value= {props.newNumber} onChange= {props.handleNumberChange} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
  
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 67381908478,
      id: 1
     },
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, SetNewNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
       //important: Math.random() < 0.5,
    }
    const exists = persons.some(person => person.name === newName)
    //console.log(newName)
    //console.log(exists)

    exists?alert(`${newName} is already added to phonebook`): setPersons(persons => [...persons, nameObject])
    
    //console.log(newName)
    setNewName('')
    SetNewNumber(0)
  }

  

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    SetNewNumber(event.target.value)
    //console.log(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  
  return (
    
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <h2>add new</h2>
      <PersonForm  addName={addName} newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        { 
          searchTerm?
          <Filter persons= {persons} searchTerm= {searchTerm} />
          :
          <Persons persons= {persons} />
        }
    </div>
    
  )
}

export default App