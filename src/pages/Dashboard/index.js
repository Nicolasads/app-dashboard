import React, { useEffect, useState } from "react";
import "./styles.css";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";
import moment from "moment";
import "moment/locale/pt-br";
import { toast } from "react-toastify";
import DeleteModal from "../../components/DeleteModal";
import Paginator from "../../components/Paginator";

function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  let limit = 10;

  const getProducts = async () => {
    try {
      const response = await api.get(
        `/products?_page=${currentPage}&_limit=${limit}`
      );

      setData(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      await api.delete(`/products/${id}`);

      toast("Produto deletado com sucesso!", {
        type: "success",
      });

      document.getElementById("close-button").click();
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const increasePage = () => {
    setCurrentPage(currentPage + 1);

    console.log(currentPage);
  };

  const decreasePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      console.log(currentPage);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <div className="main-content">
      <Header />
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center  h-100">
          <div className="card w-75">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between my-4">
                <h4>Gerenciar Produtos</h4>
                <Link to="/product" type="button" className="btn btn-primary">
                  Adicionar produto
                </Link>
              </div>

              {data.length === 0 && (
                <h5 className="text-center">Nenhum produto cadastrado.</h5>
              )}

              {data.length !== 0 && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de fabricação</th>
                        <th scope="col">Produto perecível</th>
                        <th scope="col">Validade</th>
                        <th scope="col">Preço</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((products) => (
                        <tr key={products.id}>
                          <th scope="row">{products.nomeProduto}</th>
                          <td>{moment(products.dataFabricacao).format("L")}</td>
                          <td>
                            {products.perecivel === "true" ? "Sim" : "Não"}
                          </td>
                          <td>
                            {products.dataValidade !== ""
                              ? moment(products.dataValidade).format("L")
                              : "Sem validade"}
                          </td>
                          <td>R$ {products.precoProduto}</td>
                          <td>
                            <FiEdit2
                              color="#0288FF"
                              size={20}
                              type="button"
                              onClick={() =>
                                navigate(`/edit-product/${products.id}`)
                              }
                            />
                            <DeleteModal
                              onClick={() => deleteProduct(products.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-3 d-block mx-auto">
              <Paginator
                increase={increasePage}
                decrease={decreasePage}
                page={currentPage}
                limit={limit}
                length={data.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
