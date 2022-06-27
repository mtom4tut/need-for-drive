import { IOrder } from '../../processes/order/interface/IOrder';

export function getCity(): string {
  const storage = localStorage.getItem('location');
  const storageParse = storage ? JSON.parse(storage) : '';
  return storageParse.city ? storageParse.city : '';
}