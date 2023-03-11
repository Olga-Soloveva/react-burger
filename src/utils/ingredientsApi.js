import { request } from "./utilsApi";
import { getCookie } from "./utilsApi";

const getIngredients = () => request("ingredients");

const createOrder = (data) =>
  request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: data.map((ingredient) => {
        return ingredient._id;
      }),
    }),
  });

export { getIngredients, createOrder };
