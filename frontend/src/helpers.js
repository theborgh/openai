export const checkAuthorization = (navigate) => {
  const fetchToken = async () => {
    const response = await fetch("http://localhost:3000/auth/verifytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: sessionStorage.getItem("jwt") }),
    });

    if (import.meta.env.VITE_VERBOSE === "true")
      console.log("+ response: ", response.status, response.status === 200);

    return response.status === 200;
  };

  fetchToken().then((result) => {
    if (!sessionStorage.getItem("jwt") || !result) {
      if (import.meta.env.VITE_VERBOSE === "true")
        console.log("page is unauthorized, navigating away");
      navigate("/login");
    }
  });
};
