import styled from 'styled-components';

export const StyledShortList = styled.div`
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.3);

  padding: 30px 20px;

  .title {
    margin: 0 0 0 20px;
    h3 {
      margin: 0;
    }
    .date {
      margin: 10px 0;
      font-weight: 500;
      font-size: 0.7rem;
    }
  }

  .top-short {
    padding: 0 10px;
    /* background: #f0f0f0; */
    .top-short-header,
    .top-short-data-item {
      display: flex;
      border-radius: 5px;
      align-items: center;

      height: 40px;
    }

    .top-short-header {
      font-weight: 500;
      background: ${props => props.theme.colorWhite};
    }

    .top-short-data {
      display: flex;
      flex-direction: column;

      .top-short-data-item {
        margin-top: 5px;

        background: #ffffff;
        cursor: pointer;
        .ticker {
          background: ${(props) => props.theme.colorPrimary};
          text-align: center;
          border-radius: 5px;
          color: ${(props) => props.theme.colorWhite};
          font-size: 0.9rem;
        }
        /* &:nth-child(even) {
          background: #f2f2f2; 
          background: #ffffff; 
        }*/
        &:hover {
          background: ${(props) => props.theme.colorLightgrey};
        }
      }
    }
    .ticker {
      padding: 2px 5px;
      width: 50px;
      margin: 0 30px;

      /* background: red; */
    }
    .name {
      /* background: green; */

      width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .top-short-data-item .name {
      font-size: 0.9rem;
    }
    .short-sale {
      /* background: red; */
      width: 120px;
      margin-left: 15px;
    }
    .percentage {
      /* background: green; */
      width: 60px;
    }
    .percentage-bar {
      /* background: red; */
      width: 330px;
    }
  }
`;
