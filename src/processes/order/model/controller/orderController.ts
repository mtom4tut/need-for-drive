// Function
import { getFullLocation } from '~processes/order/functons/getFullLocation';

// Interface
import { ILocation } from '~processes/order/interface/ILoacation';
import { IOrder } from '~processes/order/interface/IOrder';
import { IOrderBtnSettings } from '~entities/TheOrder';
import { IBreadcrumb } from '~shared/ui/AppBreadcrumbs';

// Types
import { OrderStep } from '~processes/order/type/OrderStep';

interface IOrderController {
  order: IOrder;
  completed: {
    location: boolean;
    model: boolean;
    additionally: boolean;
    total: boolean;
  };
  btnSettings: IOrderBtnSettings;
  breadcrumbs: IBreadcrumb[];
}

const btnSettings: IOrderBtnSettings = {
  text: '',
  variant: 'lightgreen',
  disabled: true,
};

export function orderController(step: OrderStep, location: ILocation, model: string, color: string): IOrderController {
  const locationCompleted = Boolean(location.city && location.address);
  const modelCompleted = locationCompleted && Boolean(model);
  const modelVisible = step !== 'location' && locationCompleted;
  const additionallyVisible = modelVisible && modelCompleted && step !== 'model';

  switch (step) {
    case 'location':
      btnSettings.text = 'Выбрать модель';
      btnSettings.disabled = !locationCompleted;
      break;

    case 'model':
      btnSettings.text = 'Дополнительно';
      btnSettings.disabled = !modelCompleted;
      break;

    case 'additionally':
      btnSettings.text = 'Итого';
      btnSettings.disabled = true;
      break;
  }

  const breadcrumbs = [
    {
      href: '/order?step=location',
      text: 'Местоположение',
    },
    {
      href: '/order?step=model',
      text: 'Модель',
      disabled: !locationCompleted,
    },
    {
      href: '/order?step=additionally',
      text: 'Дополнительно',
      disabled: !modelCompleted,
    },
    {
      href: '/order?step=total',
      text: 'Итого',
      disabled: true,
    },
  ];

  return {
    order: {
      location: {
        name: 'Пункт выдачи',
        value: getFullLocation(location),
        visible: true,
      },
      model: {
        name: 'Модель',
        value: model.replaceAll(' ', '\u00a0'),
        visible: modelVisible,
      },
      color: {
        name: 'Цвет',
        value: color,
        visible: additionallyVisible,
      },
      rentalDuration: {
        name: 'Длительность аренды',
        value: {
          dateStart: undefined,
          dateEnd: undefined,
        },
        visible: additionallyVisible,
      },
      rate: {
        name: 'Тариф',
        value: '',
        visible: additionallyVisible,
      },
      babySeat: {
        name: 'Детское кресло',
        value: false,
        visible: additionallyVisible,
      },
    },
    completed: {
      location: locationCompleted,
      model: modelCompleted,
      additionally: false,
      total: false,
    },
    btnSettings,
    breadcrumbs,
  };
}
