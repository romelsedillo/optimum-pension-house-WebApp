import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { PlusIcon } from "./PlusIcon";
import { useAuth } from "../../../utils/AuthContext";

import AddAuthEmployee from "../../../utils/AddFunctions/AddAuthEmployee";
import { capitalize } from "../../../utils/capitalize";

const AddEmployeeModal = ({ onAddSuccess }) => {
  const { role } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("romel");
  const [position, setPosition] = useState(role);
  const [email, setEmail] = useState("romel@gmail.com");
  const [phone, setPhone] = useState("09123456789");
  const [address, setAddress] = useState("amlan");
  const [password, setPassword] = useState("sedillo19");
  const [status, setStatus] = useState("offline");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        AddAuthEmployee(
          name,
          position,
          email,
          status,
          phone,
          address,
          password
        ),
        {
          loading: "Adding......",
          success: <b>New employee added!</b>,
          error: <b>Could not add.</b>,
        }
      );
      onAddSuccess();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error(`Error adding employee: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    name === "" ||
    email === "" ||
    phone === "" ||
    address === "" ||
    password === "";

  return (
    <ModalContent className="p-4">
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Add New {capitalize(role)}
          </ModalHeader>
          <ModalBody className="">
            <div className="flex gap-2">
              <Input
                name="name"
                autoFocus
                isRequired
                size="sm"
                type="text"
                label="Name"
                placeholder=""
                variant="bordered"
                className="w-full"
                color="success"
                value={name}
                onChange={handleNameChange}
                onClear={() => setName("")}
              />
              <Input
                isRequired
                isDisabled
                name="position"
                size="sm"
                type="text"
                label="position"
                variant="bordered"
                className="w-full"
                color="success"
                value={position}
              />
              {/* <Select
                isRequired
                label="Position"
                name="position"
                size="sm"
                variant="bordered"
                className="w-full"
                color="success"
                selectedKeys={[position]}
                value={position}
                onChange={handlePositionChange}
              >
                <SelectItem key="admin" value="admin">
                  admin
                </SelectItem>
                <SelectItem key="manager" value="manager">
                  manager
                </SelectItem>
                <SelectItem key="receptionist" value="receptionist">
                  receptionist
                </SelectItem>
              </Select> */}
            </div>
            <div className="flex gap-2">
              <Input
                isRequired
                name="email"
                size="sm"
                type="email"
                label="Email"
                variant="bordered"
                className="w-full"
                value={email}
                onChange={handleEmailChange}
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage={isInvalid && "Please enter a valid email"}
                onClear={() => setEmail("")}
              />
              <Input
                name="phone"
                isRequired
                size="sm"
                type="tel"
                label="Phone"
                placeholder=""
                variant="bordered"
                className="w-full"
                color="success"
                value={phone}
                onChange={handlePhoneChange}
                onClear={() => setPhone("")}
              />
            </div>
            <div className="flex gap-2">
              <Input
                name="address"
                isRequired
                size="sm"
                type="text"
                label="Address"
                placeholder=""
                variant="bordered"
                className="w-full"
                color="success"
                value={address}
                onChange={handleAddressChange}
                onClear={() => setAddress("")}
              />
              <Input
                isRequired
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
                onChange={handlePasswordChange}
              />
            </div>

            <Input
              name="status"
              size="sm"
              type="text"
              label="Status"
              variant="bordered"
              className="hidden w-full"
              color="success"
              value={status}
              onChange={handleStatusChange}
            />
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
              endContent={<PlusIcon />}
              isDisabled={isAnyFieldEmpty}
            >
              Add {role}
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddEmployeeModal;
