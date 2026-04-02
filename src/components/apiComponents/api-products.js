// api/product-api.js
import { API_URL } from "./api-base-url";

//##############################################################
// PRODUCT MENU - PRODUCT API CALLS

// FETCH / GET all products or a single product (no auth needed)
export const fetchMenuProducts = async (productId = null) => {
  try {
    const url = productId ? `${API_URL}/api/menu/${productId}` : `${API_URL}/api/menu`;
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
	  credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

// FETCH all products or a single product (requires auth)
export const fetchProducts = async (productId = null) => {
  try {
    const url = productId ? `${API_URL}/api/product/${productId}` : `${API_URL}/api/product`;
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
	    credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

// CREATE / POST a new product (auth required)
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/api/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
	    credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to create product");
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

// UPDATE / PUT an existing product (auth required)
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/api/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
	  credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

// DELETE a product (auth required)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/api/product/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
	  credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to delete product");
    // DELETE usually returns no content, but we can return a simple message
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};