import React, { useEffect, useState, useRef } from "react";
import useIsMounted from "./useIsMounted";
const useFetch = (setLoading, endpoint, token) => {
  const [data, setData] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/" + endpoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (token && isMounted()) {
          setTimeout(() => {
            setData(data);
            setLoading(false);
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [isMounted]);
  return data;
};

export default useFetch;
