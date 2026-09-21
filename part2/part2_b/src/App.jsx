import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      //important: Math.random() < 0.5,
      //id: String(notes.length + 1),
    }

    const exists = persons.some(person => person.name === newName)
    console.log(newName)
    console.log(exists)

    exists?alert(`${newName} is already added to phonebook`): setPersons(persons => [...persons, nameObject])
    
    console.log(newName)
    setNewName('')
  }
  
  const Name = ({ person }) => {
    return <li>{person.name}</li>
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  return (
    
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => (
            <Name key={person.name} person={person} />   
          ))
        }
      </ul>
    </div>
    
  )
}

export default App