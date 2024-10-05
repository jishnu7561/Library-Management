import React, { useEffect, useState } from 'react';
import NavBar from '../../Common/navBar';
import BookCard from './bookCard';
import { useSelector } from 'react-redux';
import request from '../../../APIs/userApi';

function BooksExplore() {
    const { loggedUser } = useSelector((state) => state.user);
    const [allBooks, setAllBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBooks = (search = '', page = 0) => {
        request("GET", `/api/user/getAllBooksOnSearch?search=${search}&page=${page}&size=${4}`, {})
            .then(response => {
                console.log("Fetched books: ", response.data.content);
                setAllBooks(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    useEffect(() => {
        fetchBooks(search, page);
    }, [search, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            {/* Navigation Bar */}
            <NavBar />
            <div className="p-10 pt-24">
                {/* Search Bar */}
                <div className="flex justify-center mb-10 ">
                    <div className="flex gap-2 border-2  rounded-lg bg-gray-300 items-center w-1/2"> {/* Centering the search bar */}
                        <i className="fa-light fa-magnifying-glass text-black cursor-pointer p-2"></i>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-300 h-10 focus:outline-none text-black w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Book Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    { allBooks.map((book) => (
                        <BookCard
                            key={book.id} 
                            book={book}
                        />
                    ))}
                </div>

                {allBooks.length == 0 ?
                (<div className='text-center flex justify-center items-center items h-80'>
                  <div className='text-3xl font-bold text-indigo-300'>No Books available</div>
                </div>):
                (<div className="flex justify-center items-center mt-4 ">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <span className="text-black mx-4">{page + 1} / {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages - 1}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                  </div>
              )}
            </div>
        </div>
    );
}

export default BooksExplore;
