import { createEvent } from 'effector';

// Functions
import { getAdditionally } from '~processes/order/functons/getAdditionally';

// Interface
import { IAdditionally } from '~processes/order/interface/IAdditionally';

export const setStartDate = createEvent<Date | null>();

export function setStartDateEvent(payload: Date | null): Date | null {
  const additionally = getAdditionally();

  const newAdditionally: IAdditionally = {
    color: additionally.color,
    rentalDuration: { startDate: payload, endDate: additionally.rentalDuration.endDate },
    rate: additionally.rate,
    babySeat: additionally.babySeat,
  };

  localStorage.setItem('additionally', JSON.stringify(newAdditionally));

  return payload;
}
