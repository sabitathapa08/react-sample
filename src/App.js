import React, { useEffect } from "react";
import "./assets/scss/Style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import setDefault from "./config";
import Routing from "./routing";

function App() {
  useEffect(() => {
    setDefault();
  }, []);

  return (
    <div id="fieldsight-new" className="fieldsight-new">
      <main id="main-content" className="main-content">
        <Routing />
      </main>
    </div>
  );
}

export default App;
