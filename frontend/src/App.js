import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use relative paths for API calls - they'll be proxied through nginx
    axios
      .get("/api")
      .then((res) => setStatus(res.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>🛒 eCommerce Store</h1>

      {status && (
        <div className="status">
          <h3>✅ {status.message}</h3>
          <p>DB Time: {new Date(status.database_time).toLocaleString()}</p>
        </div>
      )}

      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
