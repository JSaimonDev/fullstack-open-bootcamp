import { useState } from "react";
import { useEffect } from "react";
import { getAll, post, deleteEntry } from "./services/contacts.js";

const Contacts = ({ persons, setPersons }) => {
  return (
    <div>
      {persons.map((persons) => (
        <p>
          {persons.name} {persons.number}
          <DeleteButton
            id={persons.id}
            setPersons={setPersons}
            name={persons.name}
          />
        </p>
      ))}
    </div>
  );
};

const DeleteButton = ({ id, setPersons, name }) => {
  const handleClick = () => {
    if (window.confirm("Delete " + name + "?")) {
      deleteEntry(id);
      getAll().then((response) => setPersons(response));
    }
  };
  return <button onClick={handleClick}>Delete</button>;
};

const FileteredContacts = ({ persons, newSearch }) => {
  const filteredPersons = persons.filter((persons) =>
    persons.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  return (
    <div>
      {filteredPersons.map((persons) => (
        <p>
          {persons.name} {persons.number}
        </p>
      ))}
    </div>
  );
};

const Search = ({ handleSearch }) => {
  return (
    <div>
      Search <input onChange={handleSearch}></input>
    </div>
  );
};

const Message = ({ message, error, on }) => {
  const divStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (on === true) {
    return (
      <div>
        {error === true ? (
          <div style={errorStyle}>{message}</div>
        ) : (
          <div style={divStyle}>{message}</div>
        )}
      </div>
    );
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [newSearch, setSearch] = useState("");
  const [message, setMessage] = useState({
    message: "",
    error: false,
    on: false,
  });

  useEffect(() => {
    getAll().then((response) => setPersons(response));
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const newPost = {
      name: newName,
      number: newNumber,
    };
    const existName = persons.findIndex((person) => person.name === newName);
    console.log(existName);
    post(newPost)
      .then((response) => {
        if (existName >= 0) {
          const updatedPersons = persons.map((person, index) => {
            if (index === existName) {
              setMessage({
                message: person.name + "'s number has been changed",
                error: false,
                on: true,
              });
              return { ...person, number: newNumber };
            } else {
              return person;
            }
          });
          setPersons(updatedPersons);
        } else {
          setMessage({
            message: newPost.name + " has been added",
            error: false,
            on: true,
          });
          console.log(message);
          setPersons(persons.concat(response.data));
        }
      })
      .catch((error) => {
        setMessage({
          message: newPost.name + " is not in the database",
          error: true,
          on: true,
        });
      });
    setTimeout(() => {
      setMessage({
        message: "",
        error: false,
        on: false,
      });
    }, 5000);
    setNewName("");
    setNumber("");
  };

  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message
        message={message.message}
        error={message.error}
        on={message.on}
      />
      <Search handleSearch={handleSearch} />
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          tel: <input onChange={handleNumber} value={newNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newSearch === "" ? (
        <Contacts persons={persons} setPersons={setPersons} />
      ) : (
        <FileteredContacts persons={persons} newSearch={newSearch} />
      )}
    </div>
  );
};

export default App;
