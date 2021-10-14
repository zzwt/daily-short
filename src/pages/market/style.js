import styled from 'styled-components';

const StyledMarket = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
  margin: 20px 0;
  height: 600px;
  align-items: flex-start;
  justify-content: center;
  p.date {
    margin-top: 0;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 5px;
  }

  .sector-shorts {
    width: 940px;
    height: 570px;
  }
`;
export default StyledMarket;
