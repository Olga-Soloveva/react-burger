import { INGREDIENTS_URL } from "./сonstant";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(`Ошибка ${res.status}`);
  });
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
  return fetch(`${INGREDIENTS_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const getIngredients = () => request("ingredients");

const createOrder = (data) =>
  request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: data.map((ingredient) => {
        return ingredient._id;
      }),
    }),
  });

export { getIngredients, createOrder };
