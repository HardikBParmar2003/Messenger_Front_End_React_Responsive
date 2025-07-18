import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastNotify() {
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}

