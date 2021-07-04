import './Test.css';
import Checkbox from '../Checkbox/Checkbox';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function Test({ questionList, MESSAGES }) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => submitResults(data.answers);

  function submitResults(arr) {
    let answersList = getAnswersList(arr);

    if (answersList.some(isEmpty)) {
      alert(MESSAGES.SYS4);
      return;
    }

    let incorrectAnswers = findIncorrectAnswers(answersList);
    let questionsCount = questionList.length;

    if (isEmpty(incorrectAnswers)) {
      alert(MESSAGES.SYS5(questionsCount));
    } else {
      alert(MESSAGES.SYS7(incorrectAnswers, questionsCount));
    }
    history.push('/');
  }

  function getAnswersList(arr) {
    let answersList = [];

    for (let questionIndex = 0; questionIndex < arr.length; questionIndex++) {
      let answers = [];

      for (let optionIndex = 0; optionIndex < 4; optionIndex++) {
        if (arr[questionIndex][optionIndex] === true) {
          answers.push(optionIndex + 1);
        }
      }

      answersList.push(answers);
    }
    return answersList;
  }

  function findIncorrectAnswers(answersList) {
    let incorrectAnswers = [];

    for (let i = 0; i < answersList.length; i++) {
      let answer = answersList[i];
      let correctAnswer = questionList[i].correctOptionList;

      if (answer.join() !== correctAnswer.join()) {
        incorrectAnswers.push(`${i + 1}. ${questionList[i].questionText}`);
      }
    }

    return incorrectAnswers;
  }

  function isEmpty(array) {
    return array.length === 0;
  }

  return (
    <form className="test" onSubmit={handleSubmit(onSubmit)}>
      <ol className="questionList">
        {questionList.map((question, questionIndex) => (
          <li className="question" key={questionIndex}>
            {question.questionText}
            <ul className="optionList">
              <Checkbox
                register={register}
                question={question}
                questionIndex={questionIndex}
              />
            </ul>
          </li>
        ))}
      </ol>

      <button type="submit" id="submitResultButton">
        Отправить
      </button>
    </form>
  );
}

export default Test;
