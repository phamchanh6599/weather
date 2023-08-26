import "./DropDown.css";
import "../../styles/styles.css";

export interface IOption {
  key: string;
  name: string;
}

interface IDropDown {
  options: IOption[];
  isDisabled?: boolean;
  name: string;
  value: string;
  handleOnChange: (name: string, value: string) => void;
}

const DropDown = ({
  options,
  isDisabled,
  name,
  value,
  handleOnChange,
}: IDropDown) => {
  return (
    <select
      name={name}
      className="input"
      onChange={(event) =>
        handleOnChange(event.target.name, event.target.value)
      }
      disabled={isDisabled}
      value={value}
    >
      <option value="">-- Please choose an option --</option>
      {options.map((option: IOption) => {
        return (
          <option key={option.key} value={option.key}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
