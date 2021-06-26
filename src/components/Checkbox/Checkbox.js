import './Checkbox.css';

function Checkbox({ register, question, questionIndex }) {
  return question.optionList.map((option, optionIndex) => (
    <li className="option" key={`${questionIndex}_${optionIndex}`}>
      <input
        className="checkbox"
        type="checkbox"
        {...register(`answers.${questionIndex}.${optionIndex}`)}
      />
      <label className="optionText">{option}</label>
    </li>
  ));
}

export default Checkbox;
