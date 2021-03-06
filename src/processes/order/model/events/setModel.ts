import { createEvent } from 'effector';

// Functions
import { getCar } from '~processes/order/functons/getCar';

// Interface
import { ICar } from '~processes/order/interface/ICar';

export const setModel = createEvent<string>();

export function setModelEvent(payload: string): string {
  const car = getCar();

  const newCar: ICar = {
    brend: car.brend,
    model: payload,
  };

  localStorage.setItem('car', JSON.stringify(newCar));

  return payload;
}
