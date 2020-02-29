import React from "react";
import styled from "styled-components";

const AnchorStyle = styled.a`
  color: "#00628E";
`;

const Nav = ({ breadcrumb, isEdit, reportName }) => (
  <nav aria-label="breadcrumb" role="navigation">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <AnchorStyle href={breadcrumb.name_url}>{breadcrumb.name}</AnchorStyle>
      </li>
      {isEdit && <li className="breadcrumb-item">{reportName}</li>}
      <li className="breadcrumb-item">
        {isEdit ? "Edit Report" : "Create Report"}
      </li>
    </ol>
  </nav>
);

export default Nav;
