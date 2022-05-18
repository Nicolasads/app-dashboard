import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyInput from "../../components/CurrencyInput";
import { api } from "../../services/api";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formError, setFormError] = useState("");
  const [product, setProduct] = useState({
    nomeProduto: "",
    dataFabricacao: "",
    perecivel: "",
    dataValidade: "",
    precoProduto: "",
  });

  const productChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const getProductId = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
    } catch (e) {
      console.log("erro", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      nomeProduto: product.nomeProduto,
      dataFabricacao: product?.dataFabricacao,
      perecivel: product.perecivel,
      dataValidade: product.perecivel === "false" ? "" : product.dataValidade,
      precoProduto: product.precoProduto,
    };
    console.log(productData);

    const fetchData = async () => {
      try {
        await api.put(`/products/${id}`, productData);

        toast("Produto atualizado com sucesso!", {
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

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center  h-100">
          <div className="card w-75">
            <div className="card-body">
              <h4 className="text-center">Editar produto</h4>

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
                      defaultValue={product?.nomeProduto}
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
                      defaultValue={product?.dataFabricacao}
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
                      defaultValue={product?.perecivel}
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
                        defaultValue={product?.dataValidade}
                      />
                    </div>
                  )}

                  <div className="form-group mt-4">
                    <label htmlFor="preco-produto" className="mb-1">
                      Preço do produto
                    </label>
                    <CurrencyInput
                      className="form-control"
                      id="preco-produto"
                      aria-describedby="preco-produto"
                      name="precoProduto"
                      onChange={productChange}
                      defaultValue={product?.precoProduto}
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
                        Editar
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

export default EditProduct;
