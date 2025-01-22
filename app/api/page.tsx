"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Typage des données récupérées depuis l'API
type APIResponseProduct = {
  id: number;
  first_name: string;
 
};

// Typage du produit utilisé dans l'application
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function ProductManager() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null); // ID du produit en cours de modification

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
      setFormData({ id: 0, name: "", price: 0, description: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  // Modifier un produit existant
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id); // Définit l'ID du produit à modifier
    setFormData(product); // Pré-remplit le formulaire avec les données du produit
  };

  // Sauvegarder les modifications (PUT)
  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editingProductId}`, formData);
      setProductList((prev) =>
        prev.map((product) =>
          product.id === editingProductId ? { ...product, ...formData } : product
        )
      );
      setEditingProductId(null); // Quitte le mode édition
      setFormData({ id: 0, name: "", price: 0, description: "" });
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
    <div className="p-8 bg-black-100 dark:bg-background dark:text-black-foreground">
      <h1 className="text-2xl font-bold text-center mb-6">Gestion des Produits</h1>

      {/* Formulaire d'ajout ou de modification de produit */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border rounded-md p-2 mr-2 text-black"
     />
        <input
          type="number"
          placeholder="Prix"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
          }
          className="border rounded-md p-2 mr-2 text-black"
     />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border rounded-md p-2 mr-2 text-black"
        />
        {editingProductId ? (
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Ajouter
          </button>
        )}
      </div>

      {/* Liste des produits */}
      <ul>
        {productList.length > 0 ? (
          productList.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center mb-3 p-1  rounded-md"
            >
              <div>
                <p className="font-bold">{product.id}</p>
                <p className="font-bold">{product.name}</p>
                <p>Prix : {product.price.toFixed(2)} €</p>
                <p>{product.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white font-bold px-3 py-1 rounded-md"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white font-bold px-3 py-1 rounded-md"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="font-extrabold">Aucun produit disponible pour le moment.</p>
        )}
      </ul>
    </div>
  );
}
