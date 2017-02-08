$(document).ready(function() {

	// Factory function
	var mission = function(id, instructions, question, answer) {

		// Function to check whether the answer is correct.
		var checkAnswer = function(userAnswer) {
			var correctAnswer = false;

			// Loop through the answers, and compare to the user's answer.
			for (var i = 0; i < answer.length; i++) {
				if (userAnswer.toLowerCase() === answer[i]) {

					// If the user answer matches, set correctAnswer to true!
					correctAnswer = true;
				}
			}

			// Check answer - do not attempt a ternary here
			if (correctAnswer) {
				getNextQuestion();
			} else {
				tryAgain();
			}
		};

		var getNextQuestion = function() {
			console.log('Correct!');
			var nextQuestionId = id + 1;

			$('.question-' + id).prop('disabled', true).addClass('disabled');
			$('.question-' + id + ' .submit-button').text('Correct!');
			$('.task.question-' + nextQuestionId).fadeIn(1000);
		};

		var tryAgain = function() {
			console.log("Incorrect.");
			var tryAgain = [
				"Try again...",
				"Not quite...",
				"Think again...",
				"That's not right...",
				"That's not it...",
				"Sorry, try it again...",
				"Incorrect answer...",
				"Give it another shot!"
			];

			var randomMessage = Math.floor(Math.random() * tryAgain.length);
			$('.question-' + id + ' .submit-button').text(tryAgain[randomMessage]);
		};

		return {
			'id': id,
			'instructions': instructions,
			'question': question,
			'answer': answer,
			'checkAnswer': checkAnswer
		};
	};

	// Create the missions using the factory function
	var tasks = [mission(0, 'Get around town!', "On what regional transit agency can you \"Ride the Wave\"? Hint: Think Puget Sound.", ["sound transit", "Sound Transit"]),
             mission(1, 'Travel between your favorite dance halls!', "What Sound Transit bus number travels from The Century Ballroom to DanceWorks Studio?", ["545", "#545", "bus 545", "bus #545"]),
             mission(2, 'This is the third question from "The Holy Grail:"', "What is your favorite color? Hint: Look at the title bar on this page.", ["Blue", "blue"])
];

	// Populate the questions on the page
	for (var i = 0; i < tasks.length; i++) {
		$('.question-' + tasks[i].id + ' .instructions .text').html(tasks[i].instructions);
		$('.question-' + tasks[i].id + ' .question .text').html(tasks[i].question);
	}

  // Event handlers: Get the current question, and the user's answer, and pass it to the checkAnswer function.
	// Click handler
	$('.submit-button').on('click', function() {
		var parentClass = $(this).parent().attr('class').split(' ');
		var question = parentClass[parentClass.length - 1];
		var parts = question.split('');
		var currentNumber = parts[parts.length - 1];
		var userAnswer = $('.' + question + ' div input').val();

		tasks[currentNumber].checkAnswer(userAnswer);

	});

	// Place return handler here!
});
