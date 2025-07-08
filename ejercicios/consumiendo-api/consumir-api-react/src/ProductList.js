import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setProducts(res.data))
    .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Productos</h1>
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredProducts.map(product => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
