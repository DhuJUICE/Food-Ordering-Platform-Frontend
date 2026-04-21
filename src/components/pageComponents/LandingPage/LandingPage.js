import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "./ShopContext";
import ShopSelectionSection from "../../ui/ShopSelectionSection";

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

      <ShopSelectionSection
        shops={shops}
        onSelectShop={goToShop}
      />

    </div>
  );
};

export default LandingPage;