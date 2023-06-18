import React from "react";
import "../styles/Pagination.css";

export default function Paginate(props) {
  const total_pages = props.totalPages <= 500 ? props.totalPages : 500;
  return (
    <>
      <h3 className="text-light text-center mt-5">Total pages - {total_pages}</h3>
      <div className="container Movies__paginate">
        <button
          type="button"
          disabled={props.currentPage <= 1}
          className="btn btn-lg btn-outline-light"
          onClick={props.handlePrevClick}
        >
          &larr;
        </button>
        <div className="Movies__pageValue">
          <input
            type="text"
            id="page-value"
            value={props.currentPage}
            onChange={props.handlePageChange}
            onKeyDown={props.handlePaginate}
          />
        </div>
        <button
          type="button"
          disabled={props.currentPage + 1 > total_pages}
          className="btn btn-lg btn-outline-light"
          onClick={props.handleNextClick}
        >
          &rarr;
        </button>
      </div>
    </>
  );
}
