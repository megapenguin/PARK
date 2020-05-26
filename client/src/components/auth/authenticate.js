import axios from "axios";

export default async (userInfo) => {
  console.log("authenticate.js");
  let res = await axios
    .post("/api/auth/login", { ...userInfo })
    .catch((error) => error.response);

  if (res.status === 422) {
    return { success: false, errorMassage: "Invalid email or password" };
  } else if (res.status === 200) {
    localStorage.setItem("token", res.data.token);

    return { success: true };
  }
};
