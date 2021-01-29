import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';

const Container = styled.div`
  width: 475px;
  margin: 1em auto;
  padding: 1em;
  background-color: #fff;
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const timeSlotValidator = slotTime => {
  const morningTime = new Date(
    slotTime.getFullYear(),
    slotTime.getMonth(),
    slotTime.getDate(),
    '09',
    '0',
    '0'
  );

  const isValid = slotTime.getTime() > morningTime.getTime();

  return isValid;
};

const Calendar = ({ handleScheduled }) => {
  return (
    <Container>
      <h6>Choisissez une date et une heure</h6>

      <DayTimePicker
        timeSlotSizeMinutes={30}
        onConfirm={handleScheduled}
        timeSlotValidator={timeSlotValidator}
      />
    </Container>
  );
};

export default Calendar;
