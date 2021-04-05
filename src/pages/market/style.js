import styled from 'styled-components';

const StyledMarket = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 30px 30px;
  margin-top: 20px;
  height: 600px;
  background: #f2f2f2;
  /* display: flex; */
  align-items: flex-start;
  justify-content: center;
  p.date {
    margin-top: 0;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 5px;
  }

  .sector-shorts {
    /* margin-top: 30px; */
    width: 940px;
    height: 570px;
  }
`;
export default StyledMarket;
