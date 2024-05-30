import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { TitleType } from '../../types/commonTypes';

type Props = {
  text: string;
  type: TitleType;
}

const PageTitle = styled.div`
  font-size: 32px;
  padding: 32px 0;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 24px;
  letter-spacing: 10%;
  /* text-decoration: underline; */
`;

const CardTitle = styled.div`
  font-size: 20px;
  letter-spacing: 10%;
  /* text-decoration: underline; */
`;

const Title : FC<Props> = ({ text, type }) => {
  const TitleComponent = useMemo(() => {
    switch (type) {
      case TitleType.PageTitle:
        return (
          <PageTitle>{text}</PageTitle>
        );
      case TitleType.SubTitle:
        return (
          <SubTitle>{text}</SubTitle>
        );
      case TitleType.CardTitle:
        return (
          <CardTitle>{text}</CardTitle>
        );
      default:
        return (
          <h6>{text}</h6>
        );
    }
  }, [text, type]);

  return (
    <div>
      {TitleComponent}
    </div>
  );
};

export default Title;
