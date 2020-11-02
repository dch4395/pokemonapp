import React from "react";
// import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import LoadAbleBootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import overlayFactory from 'react-bootstrap-table2-overlay';
import { LoadingTable } from "./Loading";

// const LoadAbleBootstrapTable = Loadable({
//     loader: () => import('react-bootstrap-table-next'),
//     loading() {
//         return <div>Loading...</div>
//     }
// });

export const RemotePagination = ({
  loading,
  id,
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  onSizePerPageChange,
  indication,
  selectRow,
  rowEvents,
  isNotRemote,
  cellEdit,
  onJumpToPageChange,
  onJumpToPage,
  showJumpToPage
}) => {
  const customTotal = (from, to, size) => {
    let hideJumpToPage = true;
    if (showJumpToPage === true) {
      hideJumpToPage = false;
    }
    if (!hideJumpToPage) {
      if (sizePerPage * page > size) {
        sizePerPage = size;
      } else {
        sizePerPage = sizePerPage * page;
      }
      return (
        <div className="jumpPage">
          <span className="react-bootstrap-table-pagination-total">
            Jump to page{" "}
            <input
              style={{ width: 50 }}
              type="number"
              onChange={onJumpToPageChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  onJumpToPage();
                }
              }}
            />{" "}
            <button onClick={onJumpToPage}>Go</button>
            <br />
            Showing {from} to {sizePerPage} of {size} Results
          </span>
        </div>
      );
    } else {
      if (sizePerPage * page > size) {
        sizePerPage = size;
      } else {
        sizePerPage = sizePerPage * page;
      }
      // console.log(sizePerPage + " " + size + " " + page);
      return (
        <div className="jumpPage">
            <span className="react-bootstrap-table-pagination-total">
              Showing {from} to {sizePerPage} of {size} Results
            </span>
        </div>
      );
    }
  };

  const NoDataIndication = () => <LoadingTable />;

  const options = {
    bootstrap4: true,
    paginationSize: 3,
    totalSize,
    sizePerPage,
    hideSizePerPage: true,
    page,
    alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    pageStartIndex: 1, // first page will be 0, default is 1
    // firstPageText: "First",
    // prePageText: "Back",
    // nextPageText: "Next",
    // lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    // sizePerPageList: [{
    //     text: '10', value: 10
    // }, {
    //     text: '25', value: 25
    // }, {
    //     text: '100', value: 100
    // }], // A numeric array is also available. the purpose of above example is custom the text
    showTotal: true,
    paginationTotalRenderer: customTotal,
  };

  let remote = true;
  if (isNotRemote) {
    remote = false;
  }

  return (
    <div>
      <LoadAbleBootstrapTable
        remote={remote}
        keyField={id}
        data={data}
        columns={columns}
        filter={filterFactory()}
        selectRow={selectRow}
        rowEvents={rowEvents}
        pagination={paginationFactory(options)}
        // noDataIndication={indication}
        onTableChange={onTableChange}
        noDataIndication={
          loading === true ? () => <NoDataIndication /> : indication
        }
        cellEdit={cellEdit}
        wrapperClasses="table-responsive"
        // noDataIndication={() => <NoDataIndication />}
        // loading={loading}
        // overlay={overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' })}
        striped={true}
      />
    </div>
  );
};
