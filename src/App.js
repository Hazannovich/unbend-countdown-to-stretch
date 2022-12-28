import React from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
function App() {
  // useEffect(() => {
  //     fetch('http://127.0.0.1:5000/get',
  //         {
  //             method: 'GET',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  //             },
  //             mode: 'cors',
  //         })
  //         .then(response => response.json())
  //         .then(data => console.log(data))
  //         .catch(error => console.log(error))
  // }, [])

  return (
    <>
      <AnimatedRoutes />
      <Footer />
    </>
  );
}

export default App;
