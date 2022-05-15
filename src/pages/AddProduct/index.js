import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nomeProduto: "",
    dataFabricacao: "",
    perecivel: false,
    dataValidade: "",
    precoProduto: "",
  });

  const productChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: new Date().getTime(),
      nomeProduto: product.nomeProduto,
      dataFabricacao: product.dataFabricacao,
      perecivel: product.perecivel,
      dataValidade: product.dataValidade,
      precoProduto: product.precoProduto,
    };

    try {
      const response = await api.post("/products", data);

      console.log("response", response);

      toast("Produto criado com sucesso!", {
        type: "success",
      });

      navigate("/dashboard");
    } catch (e) {
      console.log("erro", e);
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
                <form onSubmit={handleSubmit}>
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
                      onChange={productChange}
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
                      onChange={productChange}
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
                      onChange={productChange}
                    >
                      <option value="">Selecione</option>
                      <option value={true}>Sim</option>
                      <option value={false}>Não</option>
                    </select>
                  </div>

                  {product.perecivel === "true" && (
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
                        onChange={productChange}
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
                      onChange={productChange}
                    />

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
