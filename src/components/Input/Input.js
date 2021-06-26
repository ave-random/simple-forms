import './Input.css';

function Input({ name, label, register, required, error, validate }) {
  return (
    <div className="textInputWrapper">
      <div className="label">{label}</div>
      <input
        className={`textInput ${error ? 'textInputError' : ''}`}
        type="text"
        {...register(name, { required, validate })}
      />
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}

export default Input;
