import React from "react";
import { FiTrash2 } from "react-icons/fi";

// import { Container } from './styles';

function DeleteModal({ onClick }) {
  return (
    <>
      <FiTrash2
        color="#EA3757"
        size={20}
        className="mx-2"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Alerta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-button"
              />
            </div>
            <div className="modal-body">
              <h5>Deseja deletar este produto?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClick}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
