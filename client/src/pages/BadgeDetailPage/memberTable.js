import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import { MdPeopleOutline, MdOutlineFileDownload } from "react-icons/md";

import makeData from "./makeData";
import CatProfile from "./catProfile.png";
import {CSVLink, CSVDownload} from 'react-csv';


const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 13px;
`;

const ProfileName = styled.div`
  margin: auto 0px;
`;

const MembersInfoHeadBox = styled.div`
  width: 100%;
  //   margin: 0px auto;
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const MembersInfoHeadLeft = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  color: #ffffff;
  display: flex;
`;

const MembersTitle = styled.div`
  font-family: NeoDunggeunmo Pro;
  font-size: 32px;
  color: #ffffff;
  margin: auto 0px;
`;

const CSVDownloadButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  background-color: rgba(255, 255, 255, 0.2);
  margin-left: 19px;
  font-size: 22px;
  color: #c4c4c4;
`;

const MembersInfoHeadRight = styled.div`
  font-family: Roboto Mono;
  font-size: 12px;
  color: #ffffff;
`;

const Styles = styled.div`
  //   padding: 1rem;
  width: 100%;
  color: #777777;
  font-family: Roboto Mono;
  font-size: 14px;
  table {
    border-spacing: 0;
    border: 0;
    width: 100%;
    thead {
        tr {
            th {
                color: #777777;
                font-size: 18px;
                padding-bottom: 18px;
                border-bottom: 1px solid #c4c4c4;
                :first-child {
                    padding-left: 20px;
                }
            }
        }
    },
    td {
      margin: 0;
      padding-top: 17px;
      padding-bottom: 17px;
      border-bottom: 1px solid #c4c4c4;
      border-right: 0;
      :first-child {
        color: #ffffff;
        font-size: 24px;
        font-family: NeoDunggeunmo Pro;
        padding-left: 20px;
        display: flex;
      },
    }
  }
  .pagination {
    width: 100%;
    padding: 0.5rem;
    padding-bottom: 200px;
    text-align: center;
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <pre></pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {index == 0 ? (
                        <>
                          <ProfileImg src={CatProfile} />
                        </>
                      ) : (
                        <></>
                      )}
                      <ProfileName>{cell.render("Cell")}</ProfileName>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function MembersTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "profile",
        accessor: "profile",
      },
      {
        Header: "wallet address",
        accessor: "walletAddress",
      },
      {
        Header: "joined date",
        accessor: "joinedAt",
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(50), []);

  return (
    <>
      <MembersInfoHeadBox>
        <MembersInfoHeadLeft>
          <MembersTitle>Members</MembersTitle>
          <CSVLink data={data}> 
          <CSVDownloadButton>
            <MdOutlineFileDownload />
          </CSVDownloadButton>
          </CSVLink>
        </MembersInfoHeadLeft>
      </MembersInfoHeadBox>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </>
  );
}

export default MembersTable;
