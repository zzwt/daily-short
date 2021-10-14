import styled from 'styled-components';

export const StyledFooter = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;

  padding: 20px;
  a {
    color: inherit;
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
