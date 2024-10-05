import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import request from '../../../APIs/userApi';
  

function HistoryTable({userId}) {

    const navigate = useNavigate();
    const { loggedUser } = useSelector((state) => state.user);
    const [allHistory, setAllHistory] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1)
  
    const fetchUsers = (search = '', page = 0, userId) => {
      request(
          "GET",
          `/api/admin/getAllHistory?search=${search}&page=${page}&userId=${userId}&size=${2}`,
          {}
      )
      .then(response => {
        console.log(response.data.content)
           setAllHistory(response.data.content);
          setTotalPages(response.data.totalPages);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
      fetchUsers(search, page,userId);
  }, [search, page, loggedUser.id]);

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
      setPage(newPage);
  };

  const formatDate =(data)=>{
    if(data != null){
    const borrowedAt = new Date(); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return borrowedAt.toLocaleDateString('en-US', options);
    }
  }
    

  return (
    <div className="ml-64 h-screen  p-5 bg-grey-100 fixed p-32">
        {/* Table container should have a margin to not overlap with the fixed sidebar */}
        <div className="flex flex-col bg-white p-10 gap-4 rounded-xl">
          <div className="flex justify-center items-center mx-5 my-4">
            <div className="flex gap-2 px-4 w-full rounded-lg bg-grey items-center">
              <i className="fa-light fa-magnifying-glass text-black cursor-pointer"></i>
              <input
                type="text"
                placeholder="Search"
                className="bg-grey h-10 focus:outline-none text-black w-full"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
  
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="text-xs text-black uppercase">
              <tr>
                <th className="px-6 py-3">Book Name</th>
                <th className="px-6 py-3">Borrowed At</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Returned At</th>
              </tr>
            </thead>
            <tbody>
              {allHistory?.map(data => (
                <tr key={data.id} className="border-b">
                  <th className="px-6 py-4">{data.book.title}</th>
                  <td className="px-6 py-4">{formatDate(data.borrowed_at)}</td>
                  <td className="px-6 py-4">
                    <span className={data.returned_at ? 'text-green-800 bg-green-400 rounded-md px-1 py-1 text-xs' : 'text-red-800 bg-red-400 rounded-md px-1 py-1 text-xs'}>
                    {data.returned_at ? 'returned' : 'not returned'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(data.returned_at)}</td>
                    
                </tr>
              ))}
            </tbody>
          </table>

          {allHistory.length == 0 ?
                (<div className='text-center flex justify-center items-center items h-20'>
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
  )
}

export default HistoryTable