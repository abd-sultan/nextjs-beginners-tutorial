"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

type Product = {
   id: number; 
   name: string; 
   price: number; 
   description: string 
  };

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, "id">>({ name: "", price: 0, description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const API_URL = "https://reqres.in/api/products";

  // function pour recuperer les produits

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setProducts(
        res.data.data.map((p: 
          { id: number; 
            first_name: string ;
            price: number;
            description: string;
          }) => ({
          id: p.id,
          name: p.first_name,
          price: +(Math.random() * 90 + 10).toFixed(2),
          description: `Description de ${p.first_name}`,
        }))
      );
    });
  }, []);

// function pour ajouter ou modifier un produit
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) return alert("Tous les champs sont requis.");
    if (editingId) {
      // PUT request pour modifier un produit existant
      await axios.put(`${API_URL}/${editingId}`, form);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
      );
    } else {

      // POST request pour ajouter un nouveau produit
      const res = await axios.post(API_URL, form);
      setProducts((prev) => [...prev, { ...form, id: res.data.id }]);
    }
    // reunitialiser le formulaire aprés l'ajout ou la modification
    setForm({ name: "", price: 0, description: "" });
    setEditingId(null);
  };

 // function pour supprimer un produit
  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard of Products</h1>
      <div className="my-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2 text-black"
        />
        <input
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
          className="border p-2 mr-2 text-black"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 mr-2 text-black"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
          {editingId ? "Update" : "Add"}
        </button>
      </div>
      <ul>
      {products.length === 0 && (
         <p className="text-center font-bold text-white-500">Aucun produit disponible pour le moment.</p>
       )}
        {products.map((p) => (
          <li key={p.id} className="flex justify-between p-2 border-b">
            <div>
              <p>{p.name}</p>
              <p>{p.price.toFixed(2)} €</p>
              <p>{p.description}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setEditingId(p.id);
                  setForm({ name: p.name, price: p.price, description: p.description });
                }}
                className="bg-green-500 text-white font-bold px-2 mr-2 rounded-lg p-1"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white font-bold px-2 rounded-lg p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
