import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ShowPasswordButtonType {
  showPassword: boolean;
  onToggle: () => void;
}

export const ShowPasswordButton = ({
  showPassword,
  onToggle,
}: ShowPasswordButtonType) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 bg-amber-300 rounded-md h-11  cursor-pointer"
    >
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="text-black-800 "
      />
    </button>
  );
};
