import React from "react";
import { useSessionStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
interface LoginProps {
  logged: boolean;
}
function Login() {
  const navigate = useNavigate();
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
    defaultValue: false,
  });

  const login = async (): Promise<LoginProps> => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    const response = await fetch('http://localhost:9000/', requestOptions);
    const data = await response.json();
    return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button
            onClick={() => {
              login().then((r) => {
              });
            }}
          >
            login
          </button>
          <p className="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
