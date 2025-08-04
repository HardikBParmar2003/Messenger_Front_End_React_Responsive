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
      className="p-2.5 bg-amber-300 rounded-md  cursor-pointer ml-1 "
    >
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="text-black-800 "
      />
    </button>
  );
};
