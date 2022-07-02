import { FC } from 'react';

// Store
import { useStore } from 'effector-react';
import { $storeAdditionally, $storeCar } from '~processes/order/model/store';

// Events
import { setColor as setColorEvent } from '~processes/order/model/events/setColor';
import { setStartDate as setStartDateEvent } from '~processes/order/model/events/setStartDate';
import { setEndDate as setEndDateEvent } from '~processes/order/model/events/setEndDate';

// Components
import { RadioOrChecboxGroup } from '~shared/ui/RadioOrChecboxGroup';
import ReactDatePicker from 'react-datepicker';

// Functions
import { initGroupColor } from './function/initGroupColors';
import { getCalendarLocale } from '~processes/lang/function/getCalendarLocale';

// Config
import { DAYS_CALENDAR, MONTH_CALENDAR } from '~processes/lang/config/localeCalendar';
import { RATES } from '../../processes/order/config/rate';
import { SERVICE } from '~processes/order/config/service';

// Styles
import cn from 'classnames';
import styles from './TheAdditionally.module.scss';

interface TheAdditionallyProps {
  className?: string;
}

export const TheAdditionally: FC<TheAdditionallyProps> = ({ className }) => {
  const storeCar = useStore($storeCar);
  const storeAdditionally = useStore($storeAdditionally);

  const colorsGroup = initGroupColor(storeCar);

  function setEndDate(date: Date | null) {
    if (date && storeAdditionally.rentalDuration.startDate && date > storeAdditionally.rentalDuration.startDate) {
      setEndDateEvent(date);
      return;
    }

    setEndDateEvent(null);
  }

  return (
    <div className={cn(className, styles['additionally'])}>
      {colorsGroup.length > 2 && (
        <div className={cn(styles['additionally__color'])}>
          <div className={cn(styles['additionally__title'])}>Цвет</div>
          <RadioOrChecboxGroup
            className={cn(styles['additionally__color-group'])}
            group={colorsGroup}
            groupName="carColor"
            initValue={storeAdditionally.color}
            handleChange={setColorEvent}
          />
        </div>
      )}

      <div className={cn(styles['additionally__calendar'])}>
        <div className={cn(styles['additionally__title'])}>Дата аренды</div>
        <div className={cn(styles['additionally__calendar-block'])}>
          <div className={cn(styles['additionally__calendar-block-item'])}>
            <span>C</span>
            <ReactDatePicker
              selected={storeAdditionally.rentalDuration.startDate}
              selectsStart
              startDate={storeAdditionally.rentalDuration.startDate}
              endDate={storeAdditionally.rentalDuration.endDate}
              onChange={(date) => {
                setStartDateEvent(date);
              }}
              calendarStartDay={1}
              locale={getCalendarLocale(DAYS_CALENDAR['ru'], MONTH_CALENDAR['ru'])}
              timeCaption="Время"
              placeholderText="Введите дату и время"
              showTimeSelect
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="dd.mm.yyyy HH:mm"
              isClearable
            />
          </div>
          <div className={cn(styles['additionally__calendar-block-item'])}>
            <span>По</span>
            <ReactDatePicker
              selected={storeAdditionally.rentalDuration.endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={storeAdditionally.rentalDuration.startDate}
              endDate={storeAdditionally.rentalDuration.endDate}
              minDate={storeAdditionally.rentalDuration.startDate}
              calendarStartDay={1}
              locale={getCalendarLocale(DAYS_CALENDAR['ru'], MONTH_CALENDAR['ru'])}
              timeCaption="Время"
              placeholderText="Введите дату и время"
              showTimeSelect
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="dd.mm.yyyy HH:mm"
              isClearable={!!storeAdditionally.rentalDuration.endDate}
            />
          </div>
        </div>
      </div>

      <div className={cn(styles['additionally__rate'])}>
        <div className={cn(styles['additionally__title'])}>Тариф</div>
        <RadioOrChecboxGroup
          className={cn(styles['additionally__rate-group'])}
          group={RATES}
          groupName="rate"
          initValue={'ggg'}
          handleChange={() => {}}
        />
      </div>

      <div className={cn(styles['additionally__service'])}>
        <div className={cn(styles['additionally__title'])}>Доп услуги</div>
        <RadioOrChecboxGroup
          className={cn(styles['additionally__service-group'])}
          group={SERVICE}
          type="checkbox"
          groupName="service"
          handleChange={() => {}}
        />
      </div>
    </div>
  );
};
