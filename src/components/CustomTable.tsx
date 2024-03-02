import React from 'react';
import DataGrid from 'react-data-grid';

interface Props {
    column?: any,
    row?: any,
}

const CustomTable: React.FC<Props> = ({ column, row }) => {

    return (
        <div>
            <DataGrid columns={column} rows={row} />
        </div>
    );
};

export default CustomTable;
