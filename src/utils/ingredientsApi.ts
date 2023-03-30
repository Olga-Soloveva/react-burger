import { request } from "./utilsApi";
import { getCookie } from "./utilsApi";
import { TIngredient } from "./types";

const getIngredients = () => request("ingredients");

const createOrder = (data: TIngredient[]) =>
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
