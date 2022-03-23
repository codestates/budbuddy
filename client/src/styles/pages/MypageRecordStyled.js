import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.formColor};

  display: grid;
  grid-template-columns: repeat(3, minmax(1fr, auto));
  grid-template-rows: minmax(1fr, auto) minmax(3fr, auto) minmax(0.1fr, auto) minmax(1fr, auto);
  grid-template-areas:
    ". CalendarContainer ."
    ". PlantsCycleChange ."
    ". ChartSvg .";
`;
