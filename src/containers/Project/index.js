import React from "react";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card">{this.props.children && this.props.children}</div>
      </div>
    );
  }
}

export default Dashboard;
