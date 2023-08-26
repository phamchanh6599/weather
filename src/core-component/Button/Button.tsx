import "./Button.css";

interface IButton {
  label: string;
  variant: "primary" | "default";
  isLoading?: boolean;
  isDisabled?: boolean;
  handleOnClick: () => void;
}

const Button = ({
  label,
  variant,
  isLoading,
  isDisabled,
  handleOnClick,
}: IButton) => {
  const customClassName = `btn-${variant} ${isDisabled ? "btn-disabled" : ""} 
  }`;

  return (
    <button className={`btn ${customClassName}`} onClick={handleOnClick}>
      {isLoading ? "LOADING ..." : label}
    </button>
  );
};

export default Button;
