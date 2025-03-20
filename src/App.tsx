import React from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import type { User } from './types/base';

import { generateAddress, generateAge, generateName } from './utils/data';
import { DynamicTable } from './components/dynamic-table/dynamic-table';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];

const App: React.FC = () => {
  const [data, setData] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Simular una carga asíncrona
    setTimeout(() => {
      setData(
        Array.from({ length: 50 }, () => ({
          name: generateName(),
          age: generateAge(),
          address: generateAddress(),
        }))
      );
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      <DynamicTable
        data={data}
        columns={columns}
        sortableColumns={['name', 'age']}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
