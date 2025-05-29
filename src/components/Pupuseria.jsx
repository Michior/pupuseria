import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";


const precios = {
  "Revueltas": 1.15,
  "Frijol con queso": 1.15,
  "Queso": 1.25,
  "Mix de hierbas": 1.25,
  "Queso con jalapeño": 1.25,
  "Queso con ajo": 1.25,
  "Queso con cilantro": 1.25,
  "Queso con mora": 1.25,
  "Queso con espinaca": 1.25,
  "Queso con ayote": 1.35,
  "Queso con zanahoria": 1.35,
  "Chicharrón con queso": 1.35,
  "Queso con loroco": 1.25,
  "Chicharrón con frijol": 1.25,
  "Chicharrón": 1.35,
  "Queso con aguacate": 1.25,
  "Queso con hongos": 1.50,
  "Queso con pollo": 1.50,
  "Tocineta": 1.75,
  "Queso con chorizo": 1.75,
  "Margarita": 1.75,
  "Hawaina": 1.75,
  "Gauchita": 1.75,
  "Combo Tradicional": 3.95,
  "Combo Especialidades": 4.50,
  "Combo Nietecitos": 12.99,
  "Combo Macanudo": 21.99,
  "Combo Birria": 5.50,
  "Canasta Plátano Fritos": 4.00,
};

export default function Pupuseria() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [tipoMasa, setTipoMasa] = useState("maíz");
  const [tipo, setTipo] = useState("Revueltas");
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = () => {
    const subtotal = cantidad * precios[tipo];
    setCarrito([...carrito, { tipo, cantidad, subtotal }]);
  };

  const enviarPedido = async () => {
    if (!nombreCliente.trim()) {
      alert("Por favor ingresa tu nombre");
      return;
    }
    if (carrito.length === 0) {
      alert("Carrito vacío");
      return;
    }
    try {
      await addDoc(collection(db, "pedidos"), {
        nombreCliente,
        tipoMasa,
        items: carrito,
        fecha: Timestamp.now(),
      });
      alert("Pedido enviado correctamente");
      setCarrito([]);
      setNombreCliente("");
      setCantidad(1);
    } catch (error) {
      alert("Error al enviar pedido");
      console.error(error);
    }
  };

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h1>Pupas Casita</h1>

      <label>
        Nombre:
        <input
          type="text"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </label>

      <br /><br />

      <label>
        Masa:
        <select
          value={tipoMasa}
          onChange={(e) => setTipoMasa(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="maíz">Maíz</option>
          <option value="arroz">Arroz</option>
        </select>
      </label>

      <br /><br />

      <label>
        Tipo de Pupusa:
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          {Object.keys(precios).map((pupusa) => (
            <option key={pupusa} value={pupusa}>
              {pupusa} (${precios[pupusa].toFixed(2)})
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Cantidad:
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          style={{ marginLeft: 10, width: 60 }}
        />
      </label>

      <br /><br />

      <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      <button onClick={enviarPedido} style={{ marginLeft: 10 }}>
        Enviar pedido
      </button>

      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.cantidad} x {item.tipo} - ${item.subtotal.toFixed(2)}
          </li>
        ))}
      </ul>

      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
