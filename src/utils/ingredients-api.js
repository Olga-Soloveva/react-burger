import { INGREDIENTS_URL } from "./сonstant";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

const getIngredients = () => {
  return fetch(`${INGREDIENTS_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => res.data);
};

const createOrder = (data) => {
  return fetch(`${INGREDIENTS_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ingredients: data}),
  })
    .then(checkResponse)
    .then((res) => res);
};

export { getIngredients, createOrder };
