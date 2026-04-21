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
    <div className="flex items-center gap-2">

      <Button
        onClick={onBack}
        disabled={disabledBack}
        className="px-3 py-1"
        variant="outline"
      >
        Back
      </Button>

      <span className="font-bold capitalize text-lg">
        {status}
      </span>

      <Button
        onClick={onNext}
        disabled={disabledNext}
        className={`px-4 py-1 text-white ${getStatusColor(status)}`}
      >
        Next
      </Button>

    </div>
  );
};

export default OrderStatusControls;