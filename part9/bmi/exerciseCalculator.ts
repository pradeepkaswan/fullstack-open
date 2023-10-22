interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
	const periodLength = hours.length;
	const trainingDays = hours.filter((hour) => hour > 0).length;
	const totalHours = hours.reduce((a, b) => a + b, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating;
	let ratingDescription;

	if (average < target) {
		rating = 1;
		ratingDescription = 'you should work harder!';
	} else if (average === target) {
		rating = 2;
		ratingDescription = 'not too bad could be better';
	} else {
		rating = 3;
		ratingDescription = 'good work, you exceeded your target!';
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
