import Input from '../Input/Input';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Form.css';

function validateCorrectOptions(value, { MESSAGES }) {
  function containsInvalidNumber(options) {
    return options.some((el) => !Number.isInteger(el) || el < 1 || el > 4);
  }

  function hasDuplicates(array) {
    return array.length !== new Set(array).size;
  }

  let correctOptionList = value.split(',').map(Number).sort();

  let result =
    containsInvalidNumber(correctOptionList) ||
    hasDuplicates(correctOptionList);

  console.log(result);
  return !result || MESSAGES.SYS6;
}

function Form({ setQuestionList, MESSAGES }) {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newQuestion = {
      questionText: data.questionText,

      optionList: [
        data.firstOption,
        data.secondOption,
        data.thirdOption,
        data.fourthOption,
      ],
      correctOptionList: data.correctOption.split(',').map((el) => Number(el)),
    };
    setQuestionList((questionList) => [...questionList, newQuestion]);
    history.push('/');
  };

  return (
    <div className="form">
      <form className="questionCreator" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="questionText"
          label="Введите текст вопроса:"
          required={MESSAGES.SYS1}
          register={register}
          error={errors.questionText}
        />
        <Input
          name="firstOption"
          label="Введите текст 1 варианта ответа:"
          required={MESSAGES.SYS2(1)}
          register={register}
          error={errors.firstOption}
        />
        <Input
          name="secondOption"
          label="Введите текст 2 варианта ответа:"
          required={MESSAGES.SYS2(2)}
          register={register}
          error={errors.secondOption}
        />
        <Input
          name="thirdOption"
          label="Введите текст 3 варианта ответа:"
          required={MESSAGES.SYS2(3)}
          register={register}
          error={errors.thirdOption}
        />
        <Input
          name="fourthOption"
          label="Введите текст 4 варианта ответа:"
          required={MESSAGES.SYS2(4)}
          register={register}
          error={errors.fourthOption}
        />
        <Input
          name="correctOption"
          label="Введите номера правильных ответов через запятую:"
          required={MESSAGES.SYS3}
          register={register}
          error={errors.correctOption}
          validate={validateCorrectOptions}
        />
        <div className="questionCreatorMenu">
          <button
            className="questionCreatorButton"
            id="cancelButton"
            onClick={() => history.push('/')}
          >
            Отмена
          </button>
          <button type="submit" className="questionCreatorButton" id="okButton">
            Ок
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
