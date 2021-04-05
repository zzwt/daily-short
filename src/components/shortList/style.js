import styled from 'styled-components';

export const StyledShortList = styled.div`
  /* background: #ffffff; */
  margin: 20px 0;
  background: #f0f0f0;
  border-radius: 5px;
  padding: 30px 0;

  .title {
    margin: 0 0 0 20px;
    /* width: 400px; */
    /* text-align: center; */
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
    background: #f0f0f0;
    .top-short-header,
    .top-short-data-item {
      display: flex;
      border-radius: 5px;
      align-items: center;

      height: 40px;
    }

    .top-short-header {
      /* border-top-left-radius: 5px;
      border-top-right-radius: 5px; */
      /* width: 1000px; */
      font-weight: 500;
      background: #dedede;
    }

    .top-short-data {
      display: flex;
      flex-direction: column;

      .top-short-data-item {
        margin-top: 5px;
        /* border-radius: 5px; */

        background: #ffffff;
        /* background: #; */
        cursor: pointer;
        .ticker {
          background: #52c58e;
          text-align: center;
          border-radius: 5px;
          color: #ffffff;
          font-size: 0.9rem;
        }
        /* &:nth-child(even) {
          background: #f2f2f2; 
          background: #ffffff; 
        }*/
        &:hover {
          background: #e0e0e0;
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
