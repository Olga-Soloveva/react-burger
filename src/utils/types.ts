import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});


export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string
}


export type TingredientsCounter = { [name: string]: number }

export type TMouseEvent = (evt: React.MouseEvent<HTMLElement>) => void 



