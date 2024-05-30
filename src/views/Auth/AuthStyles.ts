import { Form } from 'formik';
import styled from 'styled-components';

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

export const AuthLink = styled.div`
  display: flex;
  gap: 8px;
  padding: 24px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  padding: 36px;
  border: 4px solid #D9D9D9;
  border-radius: 8px;
`;

// export const Title = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   padding: 36px 0;
//   font-size: 36px;
//   font-weight: 600;
// `;
