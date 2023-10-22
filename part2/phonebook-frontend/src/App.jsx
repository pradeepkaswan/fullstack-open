import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const existingPerson = persons.find((person) => person.name === newName);

		if (existingPerson) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`,
				)
			) {
				const updatedPerson = { ...existingPerson, number: newNumber };

				personService
					.update(existingPerson.id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== existingPerson.id ? person : returnedPerson,
							),
						);
						setNewName('');
						setNewNumber('');
						setMessage({
							content: `${existingPerson.name}'s number was updated.`,
							type: 'success',
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};

			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName('');
				setNewNumber('');
				setMessage({
					content: `Added ${returnedPerson.name}`,
					type: 'success',
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
		}
	};

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			personService.remove(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
			setMessage({
				content: `${name} was deleted from the phonebook.`,
				type: 'success',
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
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
			<Notification message={message} />
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
			<Persons
				persons={filteredPersons}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
