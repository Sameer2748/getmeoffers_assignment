import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Post } from '../types';
import DepartmentList from './DepartmentList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const columns = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  const getpost = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getpost();

  }, []);


  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };



  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        {/* for all post list we pass all post data as row and column names */}
        {loading ? (
          <h1>Loading data...</h1>
        ) : (
          <DataGrid rows={posts} columns={columns} getRowId={(row) => row.id} />
        )}

      </div>
      <DepartmentList />
      <button style={{ cursor: "pointer", width: "120px", height: "40px", fontSize: "18px" }} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SecondPage;
