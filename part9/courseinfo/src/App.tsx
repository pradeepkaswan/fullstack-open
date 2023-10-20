const Header = ({ name }: { name: string }) => {
	return <h1>{name}</h1>;
};

interface ContentProps {
	parts: CoursePart[];
}

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case 'basic':
			return (
				<>
					<div>
						<strong>
							{part.name} {part.exerciseCount}
						</strong>
					</div>
					<div>
						<em>{part.description}</em>
					</div>
				</>
			);
		case 'group':
			return (
				<>
					<div>
						<strong>
							{part.name} {part.exerciseCount}
						</strong>
					</div>
					<div>project exercises {part.groupProjectCount}</div>
				</>
			);
		case 'background':
			return (
				<>
					<div>
						<strong>
							{part.name} {part.exerciseCount}
						</strong>
					</div>
					<div>
						<em>{part.description}</em>
					</div>
					<div>submit to {part.backgroundMaterial}</div>
				</>
			);
		case 'special':
			return (
				<>
					<div>
						<strong>
							{part.name} {part.exerciseCount}
						</strong>
					</div>
					<div>
						<em>{part.description}</em>
					</div>
					<div>required skills: {part.requirements.join(`, `)}</div>
				</>
			);
		default:
			return assertNever(part);
	}
};

const Content = ({ parts }: ContentProps) => {
	return (
		<>
			{parts.map((part, index) => (
				<Part
					key={index}
					part={part}
				/>
			))}
		</>
	);
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`,
	);
};

const Total = ({ totalExercises }: { totalExercises: number }) => {
	return <p>Number of exercises {totalExercises}</p>;
};

interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartDescription {
	kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescription {
	requirements: string[];
	kind: 'special';
}

type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is an awesome course part',
			kind: 'basic',
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: 'group',
		},
		{
			name: 'Basics of type Narrowing',
			exerciseCount: 7,
			description: 'How to go from unknown to string',
			kind: 'basic',
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			backgroundMaterial:
				'https://type-level-typescript.com/template-literal-types',
			kind: 'background',
		},
		{
			name: 'TypeScript in frontend',
			exerciseCount: 10,
			description: 'a hard part',
			kind: 'basic',
		},
		{
			name: 'Backend development',
			exerciseCount: 21,
			description: 'Typing the backend',
			requirements: ['nodejs', 'jest'],
			kind: 'special',
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
