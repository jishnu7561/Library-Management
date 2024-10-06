
import EditBookDialogs from './editBookDialog';
import AddBookDialogs from './addBookDialog';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import request from '../../../APIs/userApi';
import { toast } from 'sonner';
import EditLimitDialog from './editLimitDialog';

function BookTable() {

      const [selectedBook, setSelectedBook] = useState(null);
      const [openEdit, setOpenEdit] = useState(false);
      const [openAdd, setOpenAdd] = useState(false);
      const [openEditLimit, setEditLimit] = useState(false)

      const { loggedUser } = useSelector((state) => state.user);
      const [allBooks, setAllBooks] = useState([]);
      const [search, setSearch] = useState('');
      const [page, setPage] = useState(0);
      const [totalPages, setTotalPages] = useState(1);
  
      const fetchUsers = (search = '', page = 0) => {
          request(
              "GET",
              `/api/admin/getAllBooksOnSearch?search=${search}&page=${page}`,
              {}
          )
          .then(response => {
          console.log("all books: "+response.data.content)
          console.log(JSON.stringify(response, null, 2));
              setAllBooks(response.data.content);
              setTotalPages(response.data.totalPages);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      };
  
      useEffect(() => {
          fetchUsers(search, page);
      }, [search, page]);
  
      const handlePageChange = (newPage) => {
          setPage(newPage);
      };
    
      const handleBlock = async(bookId) => {
        try {
          const response = await request("GET", `/api/admin/ManageArchiveBook?id=${bookId}`, {});
          if (response.data.status == 200) {
            toast.success("successfully edited");
            setAllBooks((prevUsers) => {
              return prevUsers.map(book => {
                if (book.id === bookId) {
                  return { ...book, archived: !book.archived };
                }
                return book;
              });
            });
          } else {
            toast.error(response.message)
            console.error("Unexpected response format");
          }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message)
        }
      };

      const handleEdit = (book) => {
        setSelectedBook(book); 
        setOpenEdit(true)
      };
    
      const handleCloseDialog = () => {
        setSelectedBook(null); 
        setOpenAdd(false)
        setEditLimit(false)
      };


      const handleAdd = () =>{
        setOpenAdd(true)
      }
      const handleEditLmit = () =>{
        setEditLimit(true)
      }

      const handleEditSubmit = (updatedBook) => {
        setAllBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
      };

      const handleAddBook = (newBook) => {
        setAllBooks((prevBooks) => [...prevBooks, newBook]); 
      };
    
      return (
        <div className="ml-64 h-screen  p-8 bg-grey-100">
        {/* Table container should have a margin to not overlap with the fixed sidebar */}
        <div className="flex flex-col bg-white p-10 gap-4 rounded-xl">
          <div className="flex justify-center items-center mx-5 my-4">
            <div className="flex gap-2 px-4 w-full border-2-black rounded-lg bg-grey items-center">
              <i className="fa-light fa-magnifying-glass text-black cursor-pointer"></i>
              <input
                type="text"
                placeholder="Search"
                className="bg-grey h-10 focus:outline-none text-black w-full"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
            <div className='text-indigo-500 py-1 px-3 border-2 border-indigo-400 rounded-2xl cursor-pointer' onClick={() => handleAdd()}>+Book</div>
            <div className='text-white py-1 px-3 border-2 bg-indigo-400 rounded-2xl cursor-pointer' onClick={() =>handleEditLmit()}>Limit</div>
            </div>
          </div>
  
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="text-xs text-black uppercase">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Edit</th>              
              </tr>
            </thead>
            <tbody>
              {allBooks.map(book => (
                <tr key={book.id} className="border-b">
                  <th className="px-6 py-4">{book.title}</th>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.description}</td>
                  <td className="px-6 py-4">{book.quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${book.archived ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        onClick={() => handleBlock(book.id)}>
                        {book.archived ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  <td className="px-6 py-4">
                      <button
                        className={`text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-blue-500 `}
                        onClick={() => handleEdit(book)}>
                        Edit
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="bg-indigo-500 hover:bg-indigo-700 text-xs text-white font-bold py-2 px-4 rounded">
              Previous
            </button>
            <span className="text-black mx-4">{page + 1} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="bg-indigo-500 hover:bg-indigo-700 text-xs text-white font-bold py-2 px-4 rounded">
              Next
            </button>
          </div>
        </div>

        {selectedBook &&
        <EditBookDialogs
          open={openEdit}
          handleClose={handleCloseDialog} 
          book={selectedBook} // Pass the selected user to the dialog
          onSubmit={handleEditSubmit}
        />
       }

        {openAdd &&
        <AddBookDialogs
          open={openAdd}
          handleClose={handleCloseDialog} 
          onAddBook={handleAddBook} // Pass the selected user to the dialog
        />
       }

        {openEditLimit &&
        <EditLimitDialog
          open={openEditLimit}
          handleClose={handleCloseDialog} 
        />
       }
      </div>
  );
}

export default BookTable;
