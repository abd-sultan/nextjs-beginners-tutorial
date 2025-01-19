
```markdown
# Documentation de l'API Reqres - CRUD Products

### API URL : https://reqres.in/api


Cette API permet de simuler la gestion des produits en utilisant l'API **Reqres** pour les utilisateurs, que nous adaptons pour représenter des produits.

## Endpoints disponibles

### 1. **Lister les produits** - `GET /api/products`
Récupère la liste des produits. Les produits sont simulés en utilisant les utilisateurs de **Reqres**.

#### Réponse
- **Code** : `200 OK`
- **Corps** :
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "price": 45.99,
      "description": "Product description for John Doe"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "price": 35.99,
      "description": "Product description for Jane Smith"
    }
    ...
  ]
  ```

#### Description des champs :
- `id` : Identifiant unique du produit.
- `name` : Nom du produit (généré à partir des utilisateurs Reqres).
- `price` : Prix du produit (généré aléatoirement entre 10 et 100).
- `description` : Description du produit (généré à partir du nom de l'utilisateur).

### 2. **Ajouter un produit** - `POST /api/products`
Ajoute un nouveau produit.

#### Requête
- **Méthode** : `POST`
- **Corps** :
  ```json
  {
    "name": "New Product",
    "price": 59.99,
    "description": "A description for the new product."
  }
  ```

#### Réponse
- **Code** : `201 Created`
- **Corps** :
  ```json
  {
    "id": 123,
    "name": "New Product",
    "price": 59.99,
    "description": "A description for the new product."
  }
  ```

#### Description des champs :
- `id` : Identifiant unique généré pour le produit.
- `name` : Nom du produit.
- `price` : Prix du produit.
- `description` : Description du produit.

### 3. **Mettre à jour un produit** - `PUT /api/products/:id`
Met à jour un produit existant en fonction de son `id`.

#### Requête
- **Méthode** : `PUT`
- **URL** : `/api/products/:id` (Remplacer `:id` par l'ID du produit à mettre à jour)
- **Corps** :
  ```json
  {
    "name": "Updated Product Name",
    "price": 99.99,
    "description": "Updated description of the product."
  }
  ```

#### Réponse
- **Code** : `200 OK`
- **Corps** :
  ```json
  {
    "id": 1,
    "name": "Updated Product Name",
    "price": 99.99,
    "description": "Updated description of the product."
  }
  ```

#### Description des champs :
- `id` : Identifiant unique du produit.
- `name` : Nom mis à jour du produit.
- `price` : Prix mis à jour du produit.
- `description` : Description mise à jour du produit.

### 4. **Supprimer un produit** - `DELETE /api/products/:id`
Supprime un produit en fonction de son `id`.

#### Requête
- **Méthode** : `DELETE`
- **URL** : `/api/products/:id` (Remplacer `:id` par l'ID du produit à supprimer)

#### Réponse
- **Code** : `204 No Content`
- **Corps** : Aucun contenu retourné.

---

---

## Notes

- **API Reqres** : Utilise les utilisateurs comme base pour simuler des produits.
- **Prix des produits** : Généré aléatoirement pour chaque produit.
- **ID des produits** : Un identifiant unique est généré pour chaque produit, que ce soit lors de la création ou de la mise à jour.

---
