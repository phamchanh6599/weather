import "./TextInput.css";
import "../../styles/styles.css";

interface ITextInput {
  name: string;
  value: string;
  isDisabled?: boolean;
  handleOnChange: (name: string, value: string) => void;
}

const TextInput = ({ name, value, isDisabled, handleOnChange }: ITextInput) => {
  return (
    <input
      className="input"
      name={name}
      value={value}
      disabled={isDisabled}
      onChange={(event) =>
        handleOnChange(event.target.name, event.target.value)
      }
    />
  );
};

export default TextInput;
