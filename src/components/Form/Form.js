import Input from '../Input/Input';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Form.css';

function validateCorrectOptions({ MESSAGES }) {
  return (value) => {
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
  };
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
          label="Question text:"
          required={MESSAGES.SYS1}
          register={register}
          error={errors.questionText}
        />
        <Input
          name="firstOption"
          label="First option:"
          required={MESSAGES.SYS2(1)}
          register={register}
          error={errors.firstOption}
        />
        <Input
          name="secondOption"
          label="Second option:"
          required={MESSAGES.SYS2(2)}
          register={register}
          error={errors.secondOption}
        />
        <Input
          name="thirdOption"
          label="Third option:"
          required={MESSAGES.SYS2(3)}
          register={register}
          error={errors.thirdOption}
        />
        <Input
          name="fourthOption"
          label="Fourth option:"
          required={MESSAGES.SYS2(4)}
          register={register}
          error={errors.fourthOption}
        />
        <Input
          name="correctOption"
          label="Сorrect options (separated by comma):"
          required={MESSAGES.SYS3}
          register={register}
          error={errors.correctOption}
          validate={validateCorrectOptions({ MESSAGES })}
        />
        <div className="questionCreatorMenu">
          <button
            className="questionCreatorButton"
            id="cancelButton"
            onClick={() => history.push('/')}
          >
            Cancel
          </button>
          <button type="submit" className="questionCreatorButton" id="okButton">
            Ok
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
