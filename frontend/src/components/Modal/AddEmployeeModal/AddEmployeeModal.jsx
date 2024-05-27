import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useAuth } from "../../../utils/AuthContext";

import AddAuthEmployee from "../../../utils/AddFunctions/AddAuthEmployee";
import { capitalize } from "../../../utils/capitalize";
import { getCurrentDateTime } from "../../../utils/CurrentDayTime";
import { addLogs } from "../../../utils/AddFunctions/AddLogs";

const AddEmployeeModal = ({ onAddSuccess }) => {
  const { role, user } = useAuth();
  const currentDateTime = getCurrentDateTime();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState(role);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("offline");

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
    setEmployeeStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        AddAuthEmployee(
          name,
          position,
          email,
          employeeStatus,
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
      const actions = "Added a manager";
      const details = name;
      const status = " succes";
      addLogs(currentDateTime, user?.name, position, actions, details, status);
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
          <ModalHeader className="flex flex-col gap-1 text-blue-500">
            Add New {capitalize(role)}
          </ModalHeader>
          <ModalBody className="">
            <div className="flex gap-2">
              <Input
                autoComplete="off"
                name="name"
                autoFocus
                isRequired
                size="sm"
                type="text"
                label="Name"
                placeholder=""
                variant="bordered"
                className="w-full"
                color="primary"
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
                color="primary"
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
                autoComplete="off"
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
                color={isInvalid ? "danger" : "primary"}
                errorMessage={isInvalid && "Please enter a valid email"}
                onClear={() => setEmail("")}
              />
              <Input
                autoComplete="off"
                name="phone"
                isRequired
                size="sm"
                type="tel"
                label="Phone"
                placeholder=""
                variant="bordered"
                className="w-full"
                color={isInvalid ? "danger" : "primary"}
                value={phone}
                onChange={handlePhoneChange}
                onClear={() => setPhone("")}
              />
            </div>
            <div className="flex gap-2">
              <Input
                autoComplete="off"
                name="address"
                isRequired
                size="sm"
                type="text"
                label="Address"
                placeholder=""
                variant="bordered"
                className="w-full"
                color="primary"
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
                color="primary"
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
              name="employeeStatus"
              size="sm"
              type="text"
              label="Status"
              variant="bordered"
              className="hidden w-full"
              color="success"
              value={employeeStatus}
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
