import React from "react";
import { useSessionStorage } from '@mantine/hooks';

interface LoginProps {
  logged: boolean;
}
function Login() {
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
    defaultValue: false,
  });

  const login = async (): Promise<LoginProps> => {
    try {
      const r = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return r.json();
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
                if (r.logged) setLogged(true);
                else alert("wrong password");
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
