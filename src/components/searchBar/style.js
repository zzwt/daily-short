import styled from 'styled-components';

export const StyledSearchBar = styled.div`
  /* height: 500px;
  background: inherit; */
  display: flex;
  flex-direction: column;
  position: relative;
  .search-bar {
    /* width: 200px; */

    display: flex;
    justify-content: center;
    position: relative;
    .react-autosuggest__container {
      max-width: 1000px;
      /* background: green; */
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      input {
        box-sizing: border-box;
        width: 1000px;
        padding: 10px 20px 10px 40px;
        border-radius: 5px;
        border: 1px solid #dedede;
        outline: none;
        /* box-shadow: 1px 1px 2px #dedede; */
      }
      .react-autosuggest__suggestions-container {
        /* border: 1px solid grey; */
        background: white;
        /* margin-top: 5px; */
        position: absolute;
        top: 43px;
        box-shadow: 2px 2px 5px #dedede;
        border-radius: 10px;
        z-index: 100;
        .react-autosuggest__suggestions-list {
          width: 970px;
          padding: 15px;
          /* padding: 10px; */
          margin: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, 110px);
          /* grid-column-gap: 1px; */
          /* grid-auto-rows: 100px; */
          justify-content: space-around;

          .react-autosuggest__suggestion {
            border-radius: 5px;
            width: 100px;
            padding: 5px 5px;
            /* margin: 5px 5px; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 3px;
            height: 35px;

            cursor: pointer;
            &:hover {
              background: #52c58e;
              color: #ffffff;
              .desc {
                color: #ffffff;
              }
            }
            .code {
              font-size: 0.8rem;
              font-weight: 500;
            }
            .desc {
              font-size: 0.4rem;
              height: 8px;
              width: 100px;
              text-align: center;
              margin-top: 2px;
              color: grey;
            }
          }
          .react-autosuggest__suggestion--highlighted {
            background: #52c58e;
            color: #ffffff;
            .desc {
              color: #ffffff;
            }
          }
        }
      }
    }
    .icon {
      font-size: 1.3rem;
      position: absolute;
      top: 8px;
      left: 12px;
      color: grey;
    }
    .spinner {
      position: absolute;
      height: 30px;
      width: 30px;
      right: 10px;
      top: 4px;
    }
    .error {
      position: absolute;
      top: 8px;
      right: 50px;
      color: #bd1a30;
    }
  }
  .switch_page_spinner {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);

    /* margin: 20px auto; */
  }
`;
