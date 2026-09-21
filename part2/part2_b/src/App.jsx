import { useState } from 'react'

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

    //console.log(nameObject.id)

    const exists = persons.some(person => person.name === newName)
    //console.log(newName)
    //console.log(exists)

    exists?alert(`${newName} is already added to phonebook`): setPersons(persons => [...persons, nameObject])
    
    //console.log(newName)
    setNewName('')
    SetNewNumber(0)
  }
  
  
  const matches = persons.filter(person =>
    person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  ) 


  const Name = ({ person }) => {

    return <li>{person.name} {person.number}</li>
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const hanndleNumberChange = (event) => {
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
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />

          <div>number: <input value= {newNumber} onChange= {hanndleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { 
        searchTerm?
         matches.map(match => (
            <Name key={match.name} person={match} />   
          ))
        :
          persons.map(person => (
            <Name key={person.name} person={person} />   
          ))
        }
      </ul>
    </div>
    
  )
}

export default App