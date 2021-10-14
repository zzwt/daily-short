import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: 100%;
  .header {
    width: 300px;
    margin: 40px auto 20px;
    font-weight: 800;
  }
  .menu {
    background: rgba(255, 255, 255, 0.75);
    border-radius: 10px;
    border: 2px solid white;

    margin: 20px 0;
    height: 50px;
    /* background: #ffffff; */
    /* border-radius: 5px; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .menu-item {
      cursor: pointer;
      /* width: 200px; */
      /* height: 50px; */
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;

      a {
        margin-left: 7px;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* &:first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      } */
      &:hover {
        color: ${(props) => props.theme.colorGrey};
      }
    }
    .active {
      /* background: ${(props) => props.theme.colorPrimary}; */
      /* border-bottom: 3px solid ${(props) => props.theme.colorPrimary}; */
      color: ${(props) => props.theme.colorPrimary};
      a {
        font-weight: 700;
      }
      &:hover {
        color: ${(props) => props.theme.colorPrimary};
      }
    }
  }
`;
