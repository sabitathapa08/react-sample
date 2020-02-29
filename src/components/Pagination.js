import React from "react";
import { Icon } from "react-materialize";

const Pagination = ({
  total,
  perPage,
  totalPages,
  currentPage,
  requestHandler
}) => {
  let pageNumbers = [];
  let renderPageNumbers;
  if (total !== null) {
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
      pageNumbers.push(i);
    }

    renderPageNumbers = pageNumbers.map(number => {
      let classes =
        currentPage === number ? " paging-num current" : "paging-num";

      if (
        number == 1 ||
        number == Math.ceil(totalPages) ||
        (number >= currentPage - 2 && number <= currentPage + 2)
      ) {
        return (
          <i
            key={number}
            className={classes}
            onClick={() => requestHandler(number)}
          >
            {number}
          </i>
        );
      }
    });
  }
  return (
    <div className="pager ">
      <span className="first_last" onClick={() => requestHandler(1)}>
        <Icon>first_page</Icon>
      </span>

      {currentPage > 1 && (
        <span
          className="prev_page"
          onClick={() => requestHandler(currentPage - 1)}
        >
          <Icon>navigate_before</Icon>
        </span>
      )}

      <span className="paging">{renderPageNumbers}</span>

      {currentPage < totalPages && (
        <span
          className="next_page"
          onClick={() => requestHandler(currentPage + 1)}
        >
          <Icon>navigate_next</Icon>
        </span>
      )}

      <span
        className="last_first"
        onClick={() => requestHandler(Math.ceil(totalPages))}
      >
        <Icon>last_page</Icon>
      </span>
    </div>
  );
};
export default Pagination;
