import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="container">
      <ToastContainer />

      <h1>Welcome to my website!</h1>

      <p>
        This page should be protected by a PrivateRoutes component for
        authenticated users
      </p>
    </div>
  );
};

export default Home;
