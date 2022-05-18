import React from "react";

// import { Container } from './styles';

export default function Paginator({ increase, decrease, page, length, limit }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {page > 1 && (
          <li className="page-item" onClick={() => decrease()}>
            <p className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </p>
          </li>
        )}
        <li className="page-item">
          <p className="page-link">{page}</p>
        </li>

        {page < limit - 1 && length === limit ? (
          <li className="page-item" onClick={() => increase()}>
            <p className="page-link">
              <span aria-hidden="true">&raquo;</span>
            </p>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
