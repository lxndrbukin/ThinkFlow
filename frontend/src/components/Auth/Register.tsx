import { type JSX, type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  register,
  getMe,
  setError,
} from "../../store";

export default function Register(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.length && !password.length) {
      dispatch(setError("Please enter username and password"));
      return;
    }
    if (!username.length && password.length) {
      dispatch(setError("Please enter username"));
      return;
    }
    if (!password.length && username.length) {
      dispatch(setError("Please enter password"));
      return;
    }
    if (username.length && password.length) {
      await dispatch(register({ username, password })).unwrap();
      await dispatch(getMe());
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-input">
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="auth-form-input">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        {error && <p className="auth-form-error">{error}</p>}
        <button disabled={isLoading} type="submit">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
