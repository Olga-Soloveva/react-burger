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
  return fetch(INGREDIENTS_URL)
    .then(checkResponse)
    .then((res) => res.data);
};

export { getIngredients };
