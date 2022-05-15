import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/box.png";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import { saveToken } from "../../features/slicer/appSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const result = await api.post("login", data);

      dispatch(saveToken(result.data));

      navigate("/dashboard");
    } catch (error) {
      console.log("erro", error);
    }
  };

  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="card">
            <div className="card-body">
              <img
                src={Logo}
                className="img-fluid w-25 mx-auto d-block"
                alt="logo"
              />
              <h4 className="text-center mt-4">Login</h4>

              <div className="mt-5">
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Digite seu email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1" className="mb-1">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Digite sua senha"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-4 w-100">
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
