import { store } from "../services/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE', 
  ERROR = 'ERROR'
}

export type TIngredient = {
  count?: number;
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
  componentId?: number
};

export type TIngredientWithCount = TIngredient & {count: number}

export type TOrderInfo = {
  _id: string;
  ingredients: string[];
  status: 'done' | 'created' | 'pending'
  name: string;
  createdAt: Date;
  updatedAt: string;
  number: number
};

export type TOrderInfoWithOwner = TOrderInfo & {owner: string}


export type TOrderFeed = {
  success: boolean;
  orders: TOrderInfo[];
  total: number;
  totalToday: number
}

export type TOrderHistory = TOrderFeed

export type TUser = {
  email: string; name: string 
};

export type TUserData = {
  user: TUser;
};

export type TUserWithToken = TUserData & TToken;

export type TToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

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
