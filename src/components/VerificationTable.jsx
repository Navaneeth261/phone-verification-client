import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TH = styled.th`
  background-color: #f2f2f2;
  color: #333;
  padding: 12px;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TD = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const  VerificationTable = ({ data })=> {
  const columns = React.useMemo(
    () => [
      {
        Header: "Event",
        accessor: "code_type",
      },
      {
        Header: "SMS Status",
        accessor: "sentStatus",
      },
      {
        Header: "SMS Sent At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Verification Attempts",
        accessor: "attempts",
      },
      {
        Header: "Verification Status",
        accessor: "isVerified",
      },
      {
        Header: "Verified At",
        accessor: "verifiedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Logged Out At",
        accessor: "loggedOutAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Logs / Actions",
        accessor: "status",
      },
    ],
    []
  );

  const tableData = React.useMemo(() => data.reverse(), [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TH {...column.getHeaderProps()}>{column.render("Header")}</TH>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
