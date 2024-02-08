import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 30px;

  @media (min-width: 0) and (max-width: 960px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const Section = styled.div`
  margin-bottom: 28px;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 36px;

  @media (min-width: 0) and (max-width: 960px) {
    font-size: 21px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const List = styled.ul`
  list-style-type: disc;
  margin-left: 20px;

  &.no-dots {
    list-style: none;
  }
`;

export const ListItem = styled.li`
  font-size: 1rem;
  margin-bottom: 24px;
`;