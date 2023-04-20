import Navbar from "./components/Navbar";
import SetDate from "./components/SetDate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
function App() {
  return (
    <>
      <div>
        <Navbar />
        <SetDate />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
