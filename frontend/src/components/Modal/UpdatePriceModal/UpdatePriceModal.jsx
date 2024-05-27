import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UpdateRoomRate from "../../../utils/UpdateFunctions/UpdateRoomRate";

const UpdatePriceModal = ({
  roomTypeId,
  selectedRoomTypeData,
  onUpdateSuccess,
}) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(selectedRoomTypeData?.roomRate || 0);
  }, [selectedRoomTypeData]);

  const handlePriceChange = (event) => {
    setPrice(parseFloat(event.target.value) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UpdateRoomRate(roomTypeId, price);
      await onUpdateSuccess();
    } catch (error) {
      toast.error(`Error updating room: ${error.message}`);
    }
  };

  const isAnyFieldEmpty = price === 0;

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-blue-500">Update Room Price</ModalHeader>
          <ModalBody>
            <div className="flex gap-2">
              <Input
                isRequired
                name="price"
                type="number"
                label="Price"
                placeholder="0.00"
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">&#8369;</span>
                  </div>
                }
                value={price}
                onChange={handlePriceChange}
                min={0}
                max={8000}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="sm" onPress={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              color="primary"
              size="sm"
              onPress={onClose}
              isDisabled={isAnyFieldEmpty}
            >
              Update Price
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default UpdatePriceModal;
