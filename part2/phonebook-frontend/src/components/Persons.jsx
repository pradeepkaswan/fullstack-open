const Person = ({ person, deletePerson }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button onClick={() => deletePerson(person.id, person.name)}>
				delete
			</button>
		</div>
	);
};

const Persons = ({ persons, deletePerson }) => {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={person.name}
					person={person}
					deletePerson={deletePerson}
				/>
			))}
		</>
	);
};

export default Persons;
