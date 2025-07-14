import "../../../App.css";
import "../../user/style/Form.css";

export function Signup() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="items-center">
      <h2>Sign Up</h2>
      <label htmlFor="email">First Name:</label>
      <input type="email" required />
      <label htmlFor="email">Last Name:</label>
      <input type="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
