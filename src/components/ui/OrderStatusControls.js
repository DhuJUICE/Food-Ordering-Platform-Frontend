import React from "react";
import Button from "./Button";

const OrderStatusControls = ({
  status,
  onBack,
  onNext,
  disabledBack,
  disabledNext,
  getStatusColor,
}) => {
  return (
    <div className="flex items-center justify-between md:justify-start gap-2">

      <Button
        onClick={onBack}
        disabled={disabledBack}
        variant="outline"
        className="px-3 py-2 text-sm"
      >
        Back
      </Button>

      <span className="font-bold capitalize text-base md:text-lg">
        {status}
      </span>

      <Button
        onClick={onNext}
        disabled={disabledNext}
        className={`px-4 py-2 text-white text-sm ${getStatusColor(status)}`}
      >
        Next
      </Button>

    </div>
  );
};

export default OrderStatusControls;