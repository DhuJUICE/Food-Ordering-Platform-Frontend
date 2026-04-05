// api/product-api.js
import { API_URL } from "./api-base-url";

export const fetchMenuProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/menu`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const fetchProducts = async () => {
  try {
    const url = `${API_URL}/api/product`;
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

export const updateProduct = async (product_id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/api/product/${product_id}`, {
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

export const deleteProduct = async (product_id) => {
  try {
    const response = await fetch(`${API_URL}/api/product/${product_id}`, {
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