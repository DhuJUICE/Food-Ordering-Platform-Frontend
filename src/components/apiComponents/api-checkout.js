// api-checkout.js
import { API_URL } from "./api-base-url";

export const processPayment = async (totalPrice, orderNumber, deliveryMethod, customerName, customerPhone, customerEmail) => {
  try {

    const response = await fetch(`${API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPurchaseTotal: totalPrice.toFixed(2),
        orderNumber: orderNumber,
        deliveryMethod: deliveryMethod,
		customerName: customerName,
		customerPhone: customerPhone,
		customerEmail: customerEmail
      }),
	  credentials: "include", // ⚡ ensures session cookie is sent
    });
	
    const data = await response.json();

    if (response.ok && data.success) {
      // Redirect user to PayFast payment page
      window.location.href = data.payment_url;
    } else {
      alert("Payment error: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    alert("Error processing payment: " + error.message);
  }
};
