import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const currentName = persons.filter((person) => person.name === newName);

		if (currentName.length === 0) {
			const personObject = {
				name: newName,
				number: newNumber,
			};

			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName('');
				setNewNumber('');
			});
		} else {
			alert(`${newName} is already added to phonebook`);
		}
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
			/>
			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} />
		</div>
	);
};

export default App;
