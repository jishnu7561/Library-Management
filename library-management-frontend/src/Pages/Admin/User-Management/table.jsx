
import { useSelector } from 'react-redux';
import EditUserDialog from './dialog';
import { useEffect, useState } from 'react';
import request from '../../../APIs/userApi';
import Swal from 'sweetalert2';
import ViewDialog from './viewDialog';
import { Navigate, useNavigate } from 'react-router-dom';

function BasicTable() {

      const [selectedUser, setSelectedUser] = useState({});
      const navigate = useNavigate();
      const { loggedUser } = useSelector((state) => state.user);
      const [alluser, setAllusers] = useState([]);
      const [search, setSearch] = useState('');
      const [page, setPage] = useState(0);
      const [totalPages, setTotalPages] = useState(0)
      const [openEdit,setOpenEdit]= useState("")
    
      const fetchUsers = (search = '', page = 0) => {
        request(
            "GET",
            `/api/admin/getAllUsersOnSearch?search=${search}&page=${page}`,
            {}
        )
        .then(response => {
            setAllusers(response.data.content);
            setTotalPages(response.data.totalPages);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    useEffect(() => {
        fetchUsers(search, page);
    }, [search, page, loggedUser.id]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const manageBlock = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await request("PUT", `/api/admin/ManageBlockUser/${id}`, {});
                    if (response.data?.message) {
                        const message = response.data.message;
                        if (message.includes("Success")) {
                            toast.success("successfully edited");
                            setAllusers((prevUsers) => {
                                return prevUsers.map(user => {
                                    if (user.id === id) {
                                        return { ...user, blocked: !user.blocked };
                                    }
                                    return user;
                                });
                            });
                        } else {
                            toast.error(message);
                        }
                    } else {
                        console.error("Unexpected response format");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        });
    };

      const handleEdit = (user) => {
        setSelectedUser(user); // Set the selected user
        setOpenEdit(true)
      };
    
      const handleCloseDialog = () => {
        setSelectedUser(null); // Close the dialog
        setOpenEdit(false)
        setOpenView(false)
      };

      const handleEditSubmit = (updatedUser) => {
        console.log("Submitting updated user: ", updatedUser);
        setAllusers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      };


      const [openView, setOpenView] = useState(false);
      const handleClickOpenView = (user) => {
        setOpenView(true);
        setSelectedUser(user)
      };
    
      return (
        <div className="ml-64 h-screen  p-5 bg-grey-100">
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
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone no.</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Block / Unblock</th>
                <th className="px-6 py-3">Edit</th>
                <th className="px-6 py-3">View</th>
              </tr>
            </thead>
            <tbody>
              {alluser.map(user => (
                <tr key={user.id} className="border-b">
                  <th className="px-6 py-4">{user.name}</th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.number}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  {user.role === 'USER' ? (
                    <td className="px-6 py-4">
                      <button
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        onClick={() => manageBlock(user.id)}>
                        {user.blocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  ) : <td></td>}
                    <td className="px-6 py-4">
                      <button
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        onClick={() => navigate("/admin/borrowed-history/"+user.id)}>
                        View
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Previous
            </button>
            <span className="text-black mx-4">{page + 1} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
          </div>
        </div>

       {openEdit &&
        <EditUserDialog 
          open={openEdit}
          handleClose={handleCloseDialog} 
          user={selectedUser}
          onSubmit={handleEditSubmit}
        />
       }
       {openView &&
        <ViewDialog 
          open={openView}
          handleClose={handleCloseDialog} 
          user={selectedUser}
        />
       }
      </div>
  );
}

export default BasicTable;
