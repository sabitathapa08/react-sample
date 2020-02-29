import React from "react";
import { Icon } from "react-materialize";

const Search = ({ searchText, searchHandler, searchSubmitHandler }) => (
  <div className="table-header mrt-15 mrb-30">
    <div className="table-filter flex_just">
      <div className="table-search flex_start">
        <input
          type="search"
          name="searchText"
          value={searchText}
          placeholder="Search your keyword"
          onChange={searchHandler}
        />
        <button onClick={searchSubmitHandler}>
          <Icon>search</Icon>
        </button>
      </div>
    </div>
  </div>
);

export default Search;
