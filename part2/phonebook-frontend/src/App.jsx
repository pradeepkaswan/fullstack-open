import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const addName = (event) => {
		event.preventDefault();
		const currentName = persons.filter((person) => person.name === newName);

		if (currentName.length === 0) {
			const nameObject = {
				name: newName,
			};
			setPersons(persons.concat(nameObject));
		} else {
			alert(`${newName} is already added to phonebook`);
		}
		setNewName('');
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input onChange={handleNameChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>{person.name}</div>
			))}
		</div>
	);
};

export default App;
