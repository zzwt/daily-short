import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: 100%;
  .header {
    width: 300px;
    margin: 40px auto 20px;
    color: #ffffff;
  }
  .menu {
    /* padding: 0 80px; */
    margin: 20px 0;
    height: 50px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu-item {
      cursor: pointer;
      width: 250px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        margin-left: 7px;
        font-weight: 500;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &:hover {
        /* color: #52c58e; */
        color: #8082ab;
      }
    }
    .active {
      background: #52c58e;
      color: #ffffff;
      &:hover {
        color: #ffffff;
      }
    }
  }
`;
