"use client"

import axios from "axios";
import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  name: string;
  description: string;
}

const tasks: Task[] = [
  { id: 1, name: "Ma tache 1", description: "Ceci est ma T1" },
  { id: 2, name: "Ma tache 2", description: "Ceci est ma T2" },
  { id: 3, name: "Ma tache 3", description: "Ceci est ma T3" },
  { id: 4, name: "Ma tache 4", description: "Ceci est ma T4" },
  { id: 5, name: "Ma tache 5", description: "Ceci est ma T5" },
  { id: 6, name: "Ma tache 6", description: "Ceci est ma T6" },
  { id: 7, name: "Ma tache 7", description: "Ceci est ma T7" }
]

export default function Home() {

  const [data, setData] = useState<Task[]>(tasks);

  const handleAddTask = () => {
    const newTask: Task = { id: 8, name: "Ma tache 8", description: "Ceci est ma T8" }
    setData([...data, newTask])
  }

  const handleDeleteTask = (id: number) => {
    console.log(id)
    const newArray: Task[] = data.filter((task) => task.id !== id);
    setData(newArray)
  }

  return (
    <div className="dark:bg-background dark:text-foreground bg-gray-100 w-full h-screen flex flex-col">
      <h1 className="text-center text-xl font-bold underline underline-offset-4">Liste des tâches</h1>
    
    {/* Button */}
    <button onClick={handleAddTask} className="bg-slate-700 text-white w-20 rounded-full">
      Ajouter
    </button>

    {/* Liste */}
    <ul className="p-16">
      {data.length > 0 ? (
        data.map((task) => (
          <ol key={task.id} className="flex gap-2">
            <p>{task.id} - {task.name}</p>
            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 font-extrabold text-sm">DEL</button>
            </ol>
        ))
      ) : (
        <ol>Aucune tache</ol>
      )}
       {/* second Liste */}
      
    </ul>
    </div>
  );
}


// Typage des données récupérées depuis l'API
type APIResponseProduct = {
  id: number;
  first_name: string; // Champs attendus depuis l'API
};

// Typage du produit utilisé dans l'application
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export function ProductManager() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const API_URL = "https://reqres.in/api/products";

  // Récupération des produits depuis l'API (GET)
  const loadProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      const data: APIResponseProduct[] = response.data.data || [];
      const mappedProducts = data.map((item) => ({
        id: item.id,
        name: item.first_name,
        price: +(Math.random() * 90 + 10).toFixed(2), // Prix simulé entre 10 et 100
        description: `Description de ${item.first_name}`,
      }));
      setProductList(mappedProducts);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Ajouter un nouveau produit (POST)
  const handleAddProduct = async () => {
    if (!formData.name || formData.price <= 0 || !formData.description) {
      alert("Tous les champs doivent être remplis correctement.");
      return;
    }
    try {
      const response = await axios.post(API_URL, formData);
      const newProduct: Product = { ...formData, id: response.data.id };
      setProductList((prev) => [...prev, newProduct]);
      setFormData({ name: "", price: 0, description: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  // Modifier un produit existant (PUT)
  const handleEditProduct = async (id: number) => {
    const updatedProduct = {
      name: "Produit mis à jour",
      price: 49.99,
      description: "Nouvelle description pour ce produit",
    };
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProductList((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Erreur lors de la modification du produit :", error);
    }
  };

  // Supprimer un produit existant (DELETE)
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-background dark:text-foreground">
      <h1 className="text-2xl font-bold text-center mb-6">Gestion des Produits</h1>

      {/* Formulaire d'ajout de produit */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Prix"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
          }
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border rounded-md p-2 mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des produits */}
      <ul>
        {productList.length > 0 ? (
          productList.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center bg-white p-4 mb-2 shadow rounded-md"
            >
              <div>
                <p className="font-bold">{product.name}</p>
                <p>Prix : {product.price.toFixed(2)} €</p>
                <p>{product.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Aucun produit disponible pour le moment.</p>
        )}
      </ul>
    </div>
  );
}


