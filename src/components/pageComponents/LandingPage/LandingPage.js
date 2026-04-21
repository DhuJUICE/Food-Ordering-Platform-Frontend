import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "./ShopContext";
import Button from "../../ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setShop } = useShop();

  const shops = ["platsak", "pizzaworld", "burgerhub"];

  useEffect(() => {
    setShop(null);
  }, []);

  const goToShop = (selectedShop) => {
    setShop(selectedShop);
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Welcome! Choose a Shop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {shops.map((shop) => (
          <Button
            key={shop}
            onClick={() => goToShop(shop)}
            className="text-lg px-6 py-4 bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            {shop.charAt(0).toUpperCase() + shop.slice(1)}
          </Button>
        ))}

      </div>
    </div>
  );
};

export default LandingPage;