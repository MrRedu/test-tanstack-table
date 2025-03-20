import styled, { keyframes } from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th<{ $isSortable?: boolean }>`
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
  border-bottom: 2px solid #ddd;
  cursor: ${({ $isSortable }) => ($isSortable ? 'pointer' : 'default')};

  &:hover {
    background-color: ${({ $isSortable }) =>
      $isSortable ? '#e0e0e0' : '#f2f2f2'};
  }
`;

export const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;

export const PageInput = styled.input`
  width: 60px;
  padding: 8px;
  margin: 0 4px;
  border: 1px solid #ddd;
`;

export const PageSizeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const NoResultsMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 20px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;
