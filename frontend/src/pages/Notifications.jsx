import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import NotificationCollection from "../utils/Collections/NotificationCollection";
import ReservationCollection from "../utils/Collections/ReservationCollection";
import { useAuth } from "../utils/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

const Notifications = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [notificationsData, reservationsData] = await Promise.all([
        NotificationCollection(),
        ReservationCollection(),
      ]);
      setNotifications(notificationsData);
      setReservations(reservationsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchReservationById = async (reservationId) => {
    try {
      const reservationsData = await ReservationCollection(); // Assuming this function fetches all reservations
      const reservation = reservationsData.find(
        (reservation) => reservation.id === reservationId
      );
      return reservation;
    } catch (error) {
      console.error("Error fetching reservation data:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
    fetchReservationById();
  }, []);
  const notificationData = notifications.filter(
    (item) => item.guests === user?.$id
  );
  // const reservationData = reservations.filter(
  //   (item) => item.$id === selectedReservations
  // );

  // console.log(reservations);
  // console.log(notificationData);
  // console.log(reservationData);
  const handleOpen = async (notification) => {
    setSelectedNotification(notification);
    // setSelectedReservations(notification.reservationId);
    const reservation = await fetchReservationById(notification.reservationId);
    if (reservation) {
      setReservations([reservation]);
    }
    setSelectedReservations(reservation);
    onOpen();
  };

  const handleClose = () => {
    setSelectedNotification(null);
    onClose();
  };
  console.log(selectedReservations);
  return (
    <div className="mt-20">
      <NavBar />
      <div
        className={`w-full flex flex-col items-center justify-start gap-4 px-36 py-10 ${
          notifications.length < 2 ? "h-screen" : ""
        }`}
      >
        {isLoading ? (
          <p>Loading. Please wait.</p>
        ) : (
          <div className="w-full flex flex-col items-center justify-start gap-2">
            {notificationData.length === 0 ? (
              <p>No notifications found.</p>
            ) : (
              notificationData.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-2 w-1/2 text-center cursor-pointer flex flex-col gap-2 py-4 px-6 rounded-md ${
                    notification.type === "confirmed"
                      ? "border-green-500"
                      : notification.type === "canceled"
                      ? "border-red-500"
                      : notification.type === "check-in"
                      ? "border-blue-500"
                      : notification.type === "check-out"
                      ? "border-yellow-500"
                      : ""
                  }`}
                >
                  <p className="text-lg font-semibold">Booking Notification</p>
                  <p className="text-sm">
                    <span className="font-semibold">Date:</span>{" "}
                    {notification.dateCreated}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Message:</span>{" "}
                    {notification.message}
                  </p>
                  <div>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                      onClick={() =>
                        handleOpen(notification, notification.reservationId)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />

      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {selectedNotification && (
            <>
              <ModalHeader className="flex gap-1">
                Hello, <span className="capitalize">{user.name}</span>
              </ModalHeader>
              <ModalBody>
                {selectedNotification.type === "confirmed" && (
                  <div className="flex flex-col gap-2">
                    <p>
                      We are delighted to inform you that your booking with us
                      has been successfully confirmed. Your reservation details
                      are as follows:
                    </p>
                    <div>
                      <p>Room Type: {selectedReservations?.room} </p>
                      <p>Check-in Date: {selectedReservations?.checkInDate}</p>
                      <p>Check-out Date: {selectedReservations?.checkOutDate}</p>
                    </div>
                    <p>
                      Thank you for choosing to stay with us! We look forward to
                      welcoming you soon.
                    </p>
                  </div>
                )}
                {selectedNotification.type === "check-in" && (
                  <div className="flex flex-col gap-2">
                    <p>
                      We are delighted to inform you that you have successfully
                      checked in. Here are the details of your stay:
                    </p>
                    <p>Room Details: {selectedReservations?.room}</p>
                    <p>Check-in Date: {selectedReservations?.checkInDate}</p>
                    <p>Check-out Date: {selectedReservations?.checkOutDate}</p>
                    <p>
                      Thank you for choosing to stay with us! We hope you have a
                      comfortable and enjoyable stay. If you need any assistance
                      or have any special requests, please do not hesitate to
                      contact our front desk.
                    </p>
                    <p>We look forward to serving you.</p>
                  </div>
                )}
                {selectedNotification.type === "check-out" && (
                  <div className="flex flex-col gap-2">
                    <p>
                      We hope you had a pleasant stay at Optimum Pension House.
                      This is to confirm that you have successfully checked out.
                    </p>
                    <p>
                      Thank you for choosing to stay with us! We value your
                      feedback, so please let us know about your experience. If
                      you have any questions or need further assistance, feel
                      free to contact us.
                    </p>
                    <p>We look forward to welcoming you back in the future.</p>
                  </div>
                )}
                {selectedNotification.type === "canceled" && (
                  <div className="flex flex-col gap-1">
                    <p>
                      We regret to inform you that your booking with us has been
                      canceled. We apologize for any inconvenience this may have
                      caused. Here are the details of your canceled reservation
                      and the processed refund:
                    </p>
                    <p>Room Details: {selectedReservations?.room}</p>
                    <p>Check-in Date: {selectedReservations?.checkInDate}</p>
                    <p>Check-out Date: {selectedReservations?.checkOutDate}</p>
                    <p>Refund Amount: {selectedReservations?.totalAmount}</p>
                    <p>
                      Refund Reference Number:{" "}
                      {selectedReservations?.referenceNumber}
                    </p>
                    <p>
                      If you have any questions or need further assistance
                      regarding this cancellation and refund, please do not
                      hesitate to contact us.
                    </p>
                    <p>
                      We appreciate your understanding and hope to have the
                      opportunity to welcome you in the future.
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Notifications;
