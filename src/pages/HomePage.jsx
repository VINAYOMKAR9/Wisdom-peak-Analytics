import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const { users, loading, error } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Number of users per page

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Filter and sort users
    const filteredUsers = users
        .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.address.city.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => 
            sortOrder === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div style={{
                display:"flex",
                
                justifyContent:"space-around",

                marginBottom: "1rem",
                border: "1px solid #f00505"       
                   
            }}> 
            <SearchBar   search={search} setSearch={setSearch} />
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                border: "1px solid rgb(238, 62, 191)",
                borderRadius:'25px',    
                // margin:'15px',
                // padding:'px' 
            }}>

            <button style={{marginRight:'10px'}} onClick={() => setSortOrder('A-Z')}>Sort A-Z</button>
            <button onClick={() => setSortOrder('Z-A')}>Sort Z-A</button></div>
            </div>

            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            margin:'-5px',
                            marginRight: '25px',
                            padding: '10px',
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#f8f9fa',
                            color: currentPage === index + 1 ? '#fff' : '#000',
                            // display:'flex',
                            // flexDirection:'column'

                        
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
           
            <ul>
                {currentUsers.map((user) => (
                    <li key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>City: {user.address.city}</p>
                        <Link to={`/user/${user.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>

            
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            margin: '10px',
                            padding: '10px',
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#f8f9fa',
                            color: currentPage === index + 1 ? '#fff' : '#000',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
