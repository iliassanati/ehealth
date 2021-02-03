import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';

const theme = {
  primary: '#6cf075',
  secondary: 'slategrey',
  background: '#fcfcfc', // This should match the container background
  buttons: {
    disabled: {
      color: '#333',
      background: '#f0f0f0',
    },
    confirm: {
      color: '#fff',
      background: 'slategrey',
      hover: {
        color: '',
        background: 'lightslategrey',
      },
    },
  },
  feedback: {
    success: {
      color: '#29aba4',
    },
    failed: {
      color: '#eb7260',
    },
  },
};
const GreyContainer = styled.div`
  width: 450px;
  padding: 1em;
  background-color: #fffffff;
  color: #000000;
  border-radius: 5px;
  text-align: center;
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const Calendar = ({ handleScheduled, timeSlotValidator }) => {
  return (
    <GreyContainer>
      <h6>Choisissez une date et une heure</h6>

      <DayTimePicker
        theme={theme}
        timeSlotSizeMinutes={30}
        onConfirm={handleScheduled}
        timeSlotValidator={timeSlotValidator}
      />
    </GreyContainer>
  );
};

export default Calendar;
