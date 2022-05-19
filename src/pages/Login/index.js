import React from "react";
import "./styles.css";
import Logo from "../../assets/box.png";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import { saveToken } from "../../features/slicer/appSlice";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Email Inválido").required("Email obrigatório"),
    password: Yup.string()
      .min(3, "Senha no mínimo 3 caracteres")
      .required("Senha obrigatória"),
  });

  const handleSignIn = async (values) => {
    try {
      const result = await api.post("login", values);

      dispatch(saveToken(result.data));

      navigate("/dashboard");
    } catch (err) {
      const error = err.response;

      if (error.data === "Cannot find user") {
        toast.error("Usuário não encontrado.");
      }

      if (error.data === "Incorrect password") {
        toast.error("Senha incorreta");
      }
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
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => handleSignIn(values)}
                  validationSchema={signInSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="mb-1">
                          Email
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Digite seu email"
                          name="email"
                        />
                        {errors.email && touched.email ? (
                          <p className="text-danger">{errors.email}</p>
                        ) : null}
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1" className="mb-1">
                          Senha
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Digite sua senha"
                          name="password"
                        />

                        {errors.password && touched.password ? (
                          <p className="text-danger">{errors.password}</p>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary mt-4 w-100"
                      >
                        Entrar
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
