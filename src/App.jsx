import "./App.css";
import contacts from "./contacts.json"
import "./components/ContactTable.css"

import { useState } from "react";


function App() {

  const first5Contacts = contacts.slice(0,5)

  const [modifiedArray, setModifiedArray] = useState(first5Contacts)

  function randomBehaviour () {
      const randomIndex = Math.floor(first5Contacts.length + Math.random()*(contacts.length - first5Contacts.length))
      const randomActor = contacts[randomIndex]

      if (!modifiedArray.includes(randomActor)) {
        const newArr = [...modifiedArray, randomActor]
        setModifiedArray(newArr)
      } else {
        randomBehaviour()
      }
  }

  function sortBehaviour () {
      let sortedProducts = modifiedArray.sort(
      (p1, p2) => (p1.name < p2.name) ? -1 : (p1.name > p2.name) ? 1 : 0);

      const newArr = [...sortedProducts]
      setModifiedArray(newArr)
  }

  function sortPopBehaviour () {
    let sortedProducts = modifiedArray.sort(
    (p1, p2) => (p1.popularity < p2.popularity) ? 1 : (p1.popularity > p2.popularity) ? -1 : 0);

    const newArr = [...sortedProducts]
    setModifiedArray(newArr)
}

  function deleteActor (id) {
    const filteredContacts = modifiedArray.filter((actor)=>{
      return actor.id !== id

    })
    setModifiedArray(filteredContacts)
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <div>
        <button onClick={()=>randomBehaviour()}>Add Random</button>
        <button onClick={()=>sortBehaviour()}>Sort by name</button>
        <button onClick={()=>sortPopBehaviour()}>Sort by popularity</button>
        <table>
            <thead>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Won Oscar</th>
                <th>Won Emy</th>
                <th>Delete</th>
            </thead>
            <tbody>
                {modifiedArray.map((contact)=>(
                    <tr>
                        <td><img src={contact.pictureUrl} alt="" /></td>
                        <td><p>{contact.name}</p></td>
                        <td><p>{Math.round((contact.popularity)*100)/100}</p></td>
                        <td>{contact.wonOscar && <img className="trophy" src="trophy.jpg"/>}</td>
                        <td>{contact.wonEmmy && <img className="trophy" src="/trophy.jpg"/>}</td>
                        <td><button onClick={()=>deleteActor(contact.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default App;
