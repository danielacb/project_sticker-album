import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
`;

export default Container;

export const StickersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-gap: 16px;
  justify-content: space-between;
`;
