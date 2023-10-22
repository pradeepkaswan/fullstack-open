import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from './components/CountryCard';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => setCountries(response.data));
	}, []);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClick = (event, country) => {
		setSelectedCountry(country);
	};

	const filteredCountries =
		searchTerm === ' '
			? countries
			: countries.filter((country) =>
					country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
			  );

	return (
		<>
			find countries{' '}
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			{filteredCountries.length > 10 ? (
				<div>Too many matches, specify another filter</div>
			) : (
				<>
					{filteredCountries.length === 1 ? (
						<CountryCard country={filteredCountries[0]} />
					) : (
						<>
							{selectedCountry ? (
								<CountryCard country={selectedCountry} />
							) : (
								filteredCountries.map((country) => (
									<div key={country.name.common}>
										{country.name.common}
										<button onClick={(event) => handleClick(event, country)}>
											show
										</button>
									</div>
								))
							)}
						</>
					)}
				</>
			)}
		</>
	);
}

export default App;
