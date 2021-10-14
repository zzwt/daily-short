import styled from 'styled-components';

const StyledSearchStockByCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colorWhite};
  justify-content: space-around;
  height: 400px;
  margin: 20px 0;
  .title {
    .starred {
      margin-left: 10px;
      font-size: 1.4rem;
      cursor: pointer;
    }
  }

  .chart {
    padding: 20px;
    .custom-tooltip {
      background: white;
      border: 1px solid grey;
      box-shadow: 1px 1px 5px grey;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 0.7rem;

      .pct {
        padding: 0;
        margin: 0;
        span {
          color: ${props => props.theme.colorPrimary};
        }
      }
      .st {
        margin: 10px 0 2px 0;
      }
      .amount {
        padding: 0;
        margin: 0;
      }
    }
  }
`;
export default StyledSearchStockByCode;
