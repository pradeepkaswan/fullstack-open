import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const addPerson = (event) => {
		event.preventDefault();
		const currentName = persons.filter((person) => person.name === newName);

		if (currentName.length === 0) {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			setPersons(persons.concat(personObject));
		} else {
			alert(`${newName} is already added to phonebook`);
		}
		setNewName('');
		setNewNumber('');
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={handleNameChange} />
				</div>
				<div>
					number: <input onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}
				</div>
			))}
		</div>
	);
};

export default App;
