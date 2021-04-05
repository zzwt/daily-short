import styled from 'styled-components';

export const StyledSearchStockByCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  justify-content: space-around;
  height: 400px;
  margin: 20px 0;
  .title {
    /* background: green; */
    /* margin: 0 0 30px 0; */
    .starred {
      margin-left: 10px;
      font-size: 1.4rem;
      cursor: pointer;
    }
  }

  .chart {
    /* background: red; */
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
          color: blue;
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
