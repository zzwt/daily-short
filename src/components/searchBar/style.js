import styled from 'styled-components';

export const StyledSearchBar = styled.div`
  padding: 5px;

  display: flex;
  flex-direction: column;
  position: relative;
  .search-bar {
    display: flex;
    justify-content: center;
    position: relative;
    /* width: 100%; */
    .react-autosuggest__container {
      /* max-width: 1000px;
       */
      /* width: 100%; */
      flex-grow: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;

      .react-autosuggest__input {
        box-sizing: border-box;
        /* width: 1000px; */
        width: 100%;
        padding: 10px 20px 10px 40px;
        /* border-radius: 5px;
        border: 1px solid #dedede; */
        /* border: 1px solid red; */
        border: none;
        background: none;
        outline: none;
      }

      .react-autosuggest__suggestions-container {
        background: ${(props) => props.theme.colorWhite};
        position: absolute;
        top: 45px;
        box-shadow: 2px 2px 5px #dedede;
        border-radius: 10px;
        z-index: 100;
        .react-autosuggest__suggestions-list {
          width: 970px;
          padding: 15px;
          margin: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, 110px);
          justify-content: space-around;

          .react-autosuggest__suggestion {
            border-radius: 5px;
            width: 100px;
            padding: 5px 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 3px;
            height: 35px;

            cursor: pointer;

            .suggest-item {
              &:hover {
                background: ${(props) => props.theme.colorPrimary};
                color: #ffffff;
                .desc {
                  color: #ffffff;
                }
              }
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
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
          }
          .react-autosuggest__suggestion--highlighted {
            background: ${(props) => props.theme.colorPrimary};
            .suggest-item {
              color: ${(props) => props.theme.colorWhite};
              .desc {
                color: ${(props) => props.theme.colorWhite};
              }
            }
          }
        }
      }
    }
    .icon {
      font-size: 1.3rem;
      position: absolute;
      top: 7px;
      left: 12px;
      /* color: grey; */
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
      color: ${(props) => props.theme.colorRed};
    }
  }
  .switch_page_spinner {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
