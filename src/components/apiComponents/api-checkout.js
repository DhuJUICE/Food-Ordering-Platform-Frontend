// api-checkout.js
import { API_URL } from "./api-base-url";

export const processPayment = async (shop, totalPrice, customerName, customerPhone) => {
  try {

    const response = await fetch(`${API_URL}/${shop}/api/checkout`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        totalPurchaseTotal: totalPrice.toFixed(2),
		    customerName: customerName,
        customerPhone: customerPhone,
      }),
	    credentials: "include",
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
