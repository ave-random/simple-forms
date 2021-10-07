import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import Form from '../Form/Form';
import Test from '../Test/Test';

function Main() {
  let MESSAGES = {
    SYS1: 'Вы не ввели текст вопроса',
    SYS2: (optionIndex) => `Вы не ввели текст ${optionIndex} варианта ответа`,
    SYS3: 'Вы не ввели правильные варианты ответа',
    SYS4: 'Все вопросы должны иметь хотя бы один выбранный вариант ответа',
    SYS5: (questionsCount) =>
      `Ваш результат ${questionsCount} из ${questionsCount}. Вы молодец!`,
    SYS6: 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой',
    SYS7: (incorrectAnswers, questionsCount) =>
      'Вы неправильно ответили на вопросы:\n' +
      incorrectAnswers.join('\n') +
      '\n' +
      `Ваш результат ${
        questionsCount - incorrectAnswers.length
      } из ${questionsCount}.`,
  };

  let defaultQuestionList = [
    {
      questionText:
        'Что из перечисленного не является языком программирования?',
      optionList: ['HTML', 'Java', 'Python', 'DevOps'],
      correctOptionList: [1, 4],
    },
    {
      questionText:
        'Какие из перечисленных видов тестирования могут быть автоматизированы?',
      optionList: [
        'UI тестирование',
        'Юзабилити тестирование',
        'Тестирование совместимости',
        'Unit тестирование',
      ],
      correctOptionList: [1, 3, 4],
    },
    // {
    //   questionText:
    //     "Выберите вариант, который соответствует следующему предложению: 'Известно, что грымзик обязательно или полосат, или рогат, или то и другое вместе'",
    //   optionList: [
    //     'Грымзик не можнт быть безрогим',
    //     'Грымзик не можнт быть однотонным и безрогим одновременно',
    //     'Грымзик не можнт быть полосатым и безрогим одновременно',
    //     'Грымзик не можнт быть однотонным и рогатым одновременно',
    //   ],
    //   correctOptionList: [2],
    // },
    {
      questionText: 'Выберите типы алгоритмов, которых не существует',
      optionList: [
        'Алгоритм с ветвлением',
        'Циклический безусловный',
        'Циклический с параметром',
        'Алгоритм с углублением',
      ],
      correctOptionList: [2, 4],
    },
    {
      questionText:
        'Какая (какие) из следующих конструкций используется (используются) для ветвления?',
      optionList: ['switch case', 'if else', 'do while', 'for'],
      correctOptionList: [1, 2],
    },
  ];

  const [questionList, setQuestionList] = useState(defaultQuestionList);

  return (
    <Router>
      <Route exact path="/" component={Menu} />
      <Route path="/question">
        <Form setQuestionList={setQuestionList} MESSAGES={MESSAGES} />
      </Route>
      <Route path="/test">
        <Test questionList={questionList} MESSAGES={MESSAGES} />
      </Route>
    </Router>
  );
}

export default Main;
