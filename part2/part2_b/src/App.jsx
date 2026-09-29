import { useState, useEffect } from 'react'
import personService from './services/person'

// Only components remain outside the main App component
const Name = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={() => removePerson(person.name, person.id)}>delete</button>
    </li>
  )
}

const Filter = ({ persons, searchTerm, removePerson }) => {
  const matches = persons.filter(person =>
    person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )
  return (
    <ul>
      {matches.map(match => (
        <Name key={match.name} person={match} removePerson={removePerson} />
      ))}
    </ul>
  )
}

const Persons = ({ persons, removePerson }) => {
  return (
    <ul>
      {persons.map(person => (
        <Name key={person.name} person={person} removePerson={removePerson} />
      ))}
    </ul>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name:{' '}
        <input 
          value={props.newName} 
          onChange={props.handleNameChange} 
        />
      </div>
      <div>
        number:{' '}
        <input 
          type='number' 
          value={props.newNumber} 
          onChange={props.handleNumberChange} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, SetNewNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          console.log("deleted")
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(`Failed to delete ${name}.`)
        })
    } else {
      alert("Person not deleted")
    }
  }

  const updatePerson = (id, newNumber) => {
    const personToUpdate = persons.find(person => person.id === id)
    const changedPerson = { ...personToUpdate, number: newNumber }

    personService.updatePerson(id, changedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === id ? updatedPerson : person))
        setNewName('')
        SetNewNumber(0)
      })
      .catch(error => {
        alert(`The information of '${personToUpdate.name}' was already deleted from server`)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const addName = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existingPerson.id, newNumber)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          SetNewNumber(0)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    SetNewNumber(event.target.value)
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
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      
      <h2>Numbers</h2>
      {searchTerm ? (
        <Filter persons={persons} searchTerm={searchTerm} removePerson={removePerson} />
      ) : (
        <Persons persons={persons} removePerson={removePerson} />
      )}
    </div>
  )
}

export default App