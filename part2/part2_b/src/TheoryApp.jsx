import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/person'


const Name = ({ person }) => {

  return <li>{person.name} {person.number} 
    <button onClick= {() => removePerson(person.name, person.id)}> delete </button> 
    </li>
}

const removePerson = (name, id) => {
  window.confirm(`Delete ${name}`) ? personService.deletePerson(id).then(
    () => console.log("deleted"),
    setPersons(persons.filter(n => n.id !== id))
  ):
  alert("Person not deleted")
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
  

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,

    }
    const exists = persons.some(person => person.name === newName)


    exists?alert(`${newName} is already added to phonebook`): 
    personService .create(personObject)
                  . then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    SetNewNumber(0)
                  }
                  )
  }

  const updatePerson = (id, person, updatedNumber) => {
    const person1 = persons.find(person => person.id === id) 
    const changedPerson = {
      ...person1,
      number: updatedNumber
    }

    personService.updatePerson(id, changedPerson)
    .then(
      updatedPerson =>{
        setPersons(
          persons.map(person => person.id === id ? updatedPerson: person )
        )
      }
    )
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
    })
    //setPersons(persons.filter(n => n.id !== id))
     //}
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