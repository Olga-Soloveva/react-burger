export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type TUser = {
  user: { email: string; name: string };
};

export type TUserData = {
  user: TUser;
};

export type TToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TUserWithToken = TUserData & TToken;

export type TResWithoutData = {
  success: boolean;
  message: string;
};

export type TOrder = {
  name: string;
  order: { number: number };
};

export type THandleSubmit = (evt: React.SyntheticEvent<HTMLElement>) => void;

export type TFormValues = { [name: string]: string };

export type TingredientsCounter = { [name: string]: number };

export type TMouseEvent = (evt: React.MouseEvent<HTMLElement>) => void;
