import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const formik = useFormik({
    initialValues: {
      nomeProduto: "",
      dataFabricacao: "",
      perecivel: "",
      dataValidade: "",
      precoProduto: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    const productData = {
      id: new Date().getTime(),
      nomeProduto: values.nomeProduto,
      dataFabricacao: values?.dataFabricacao,
      perecivel: values.perecivel,
      dataValidade: values.perecivel === "false" ? "" : values.dataValidade,
      precoProduto: values.precoProduto,
    };

    const fetchData = async () => {
      try {
        await api.post("/products", values);

        toast("Produto criado com sucesso!", {
          type: "success",
        });

        navigate("/dashboard");
      } catch (e) {
        console.log("erro", e);
      }
    };

    if (productData.perecivel === "true") {
      if (productData.dataFabricacao > productData.dataValidade) {
        setFormError(
          "A data de fabricação é maior que a data de validade, verifique e tente novamente."
        );
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }
  };

  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center  h-100">
          <div className="card w-75">
            <div className="card-body">
              <h4 className="text-center">Adicionar produto</h4>

              <div className="mt-3">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="nome" className="mb-1">
                      Nome do produto
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      aria-describedby="nome"
                      placeholder="Digite o nome do produto"
                      name="nomeProduto"
                      onChange={formik.handleChange}
                      value={formik.values.nomeProduto}
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label htmlFor="data-fabricação" className="mb-1">
                      Data de fabricação
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="data-fabricação"
                      aria-describedby="data-fabricação"
                      name="dataFabricacao"
                      onChange={formik.handleChange}
                      value={formik.values.dataFabricacao}
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label htmlFor="perecivel" className="mb-1">
                      Produto perecível?
                    </label>
                    <select
                      className="form-select"
                      aria-label="perecivel"
                      name="perecivel"
                      onChange={formik.handleChange}
                      value={formik.values.perecivel}
                    >
                      <option value="">Selecione</option>
                      <option value={true}>Sim</option>
                      <option value={false}>Não</option>
                    </select>
                  </div>

                  {formik.values.perecivel === "true" && (
                    <div className="form-group mt-4">
                      <label htmlFor="data-validade" className="mb-1">
                        Data de validade
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="data-validade"
                        aria-describedby="data-validade"
                        name="dataValidade"
                        onChange={formik.handleChange}
                        value={formik.values.dataValidade}
                      />
                    </div>
                  )}

                  <div className="form-group mt-4">
                    <label htmlFor="preco-produto" className="mb-1">
                      Preço do produto
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="preco-produto"
                      aria-describedby="preco-produto"
                      name="precoProduto"
                      onChange={formik.handleChange}
                      value={formik.values.precoProduto}
                    />

                    {formError && (
                      <p className="text-danger mt-3"> {formError} </p>
                    )}

                    <div className="mt-4 d-flex align-items-center justify-content-between">
                      <Link
                        to="/dashboard"
                        type="button"
                        className="btn btn-secondary w-25"
                      >
                        Voltar
                      </Link>

                      <button type="submit" className="btn btn-primary w-25">
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
