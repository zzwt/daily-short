import styled from 'styled-components';

export const StyledPercentageBar = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  .bar {
    background: ${(props) =>
      props.percentageValue > 1 ? '#ff3f4f' : '#52c58e'};
    width: ${(props) => 330 * props.widthRatio + 'px'};
    height: 20px;
    border-radius: 5px;
  }
  .title {
    /* position: absolute;
    left: 10px; */
  }
`;
