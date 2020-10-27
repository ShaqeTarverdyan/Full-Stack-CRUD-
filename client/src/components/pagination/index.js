import React from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';

const Pagination = ({totalPages,handlePageClick}) => {
    return (
        <ReactPaginate
            initialPage={0}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            breakLabel={<a target="_blank">...</a>}
            pageRangeDisplayed={6}
            marginPagesDisplayed={4}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    )
}

export default Pagination;