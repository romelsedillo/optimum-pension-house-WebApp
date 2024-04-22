import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { addAuthGuest } from "../../../utils/AddFunctions/AddAuthGuest";

const AddGuestModal = ({ onAddSuccess }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("ronel");
  const [email, setEmail] = useState("ronel@gmail.com");
  const [phone, setPhone] = useState("09123456789");
  const [address, setAddress] = useState("amlan");
  const [password, setPassword] = useState("sedillo19");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async () => {
    try {
      await addAuthGuest(name, email, phone, address, password);
      toast.success("New guest successfully added!");
      onAddSuccess(); // Call the onAddSuccess callback
    } catch (error) {
      console.error("Error adding guest:", error);
      toast.error(`Error adding guest: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    name === "" ||
    email === "" ||
    phone === "" ||
    address === "" ||
    password === "";

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Add New Guest
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              size="sm"
              type="text"
              label="Name"
              placeholder=""
              variant="bordered"
              className="w-full"
              color="success"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="sm"
              placeholder=""
              type="email"
              label="Email"
              variant="bordered"
              className="w-full"
              color="success"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="sm"
              type="tel"
              label="Phone"
              variant="bordered"
              className="w-full"
              color="success"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              size="sm"
              type="text"
              label="Address"
              placeholder=""
              variant="bordered"
              className="w-full"
              color="success"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              size="sm"
              label="Password"
              variant="bordered"
              placeholder=""
              color="success"
              className="w-full"
              value={password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="md" onPress={onClose}>
              Close
            </Button>
            <Button
            type="submit"
              color="primary"
              size="sm"
              onPress={onClose}
              onClick={() => onSave()}
              isDisabled={isAnyFieldEmpty}
            >
              Add Guest
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddGuestModal;
