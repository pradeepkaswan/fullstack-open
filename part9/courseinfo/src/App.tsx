interface HeaderProps {
	name: string;
}

const Header = ({ name }: HeaderProps) => {
	return <h1>{name}</h1>;
};

interface ContentProps {
	parts: {
		name: string;
		exerciseCount: number;
	}[];
}

const Content = ({ parts }: ContentProps) => {
	return (
		<>
			<p>
				{parts[0].name} {parts[0].exerciseCount}
			</p>
			<p>
				{parts[1].name} {parts[1].exerciseCount}
			</p>
			<p>
				{parts[2].name} {parts[2].exerciseCount}
			</p>
		</>
	);
};

interface TotalProps {
	totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => {
	return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
		},
	];

	const totalExercises = courseParts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0,
	);

	return (
		<div>
			<Header name={courseName} />
			<Content parts={courseParts} />
			<Total totalExercises={totalExercises} />
		</div>
	);
};

export default App;
