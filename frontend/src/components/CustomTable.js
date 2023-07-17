import React, { useState, useEffect, useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { request } from '../axios_helper'

const columns = [
  { field: 'number', headerName: 'Nr.', width: 60 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 120 },
  { field: 'lastName', headerName: 'Last name', width: 120 },
  { field: 'birthday', headerName: 'Birthday', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'country', headerName: 'Country', width: 200 },
  { field: 'city', headerName: 'City', width: 140 },
];

export default function CustomTable() {

  const [users, setUsers] = useState([]);
  const [seed, forceUpdate] = useReducer(x => Math.random(), 0);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    request(
      "GET",
      "/users",
      {}
    ).then((response) => {
      setUsers(response.data);
    }).catch((error) => {
      console.error("Error fetching users");
      setUsers([]);
    });
  }, [seed])

  for (let i = 0; i < users.length; i++) {
    users[i].number = i + 1;
  }

  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.preventDefault()
    navigate('/add');
  }

  const handleShowClick = (e) => {
    e.preventDefault()
    forceUpdate()
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    if (selectedRows.length > 0) {
      navigate('/edit', { state: { selectedRows } });
    } else {
      console.log("Select row");
    }
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (selectedRows.length > 0) {
      navigate('/delete', { state: { selectedRows } });
    } else {
      console.log("Select row");
    }
  }

  const paperStyle = { padding: '20px 20px', width: '100%', margin: '50px auto' }
  const buttonStyle = { width: "200px", margin: "20px auto" }
  const deleteButtonStyle = { width: "200px", margin: "20px auto", background: 'red' }
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <div style={{ height: '70vh', width: '100%' }}>
          <DataGrid
            rows={users}

            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = users.filter((row) =>
                selectedIDs.has(row.number)
              );
              setSelectedRows(selectedRowData);
            }}

            getRowId={(row) => row.number}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
            checkboxSelection
          />
        </div>
        <Grid container spacing={1.5} columns={24} style={{ width: '100%' }}>
          <Grid item xs={6}>
            <Button variant="contained" style={buttonStyle} onClick={handleShowClick}>Refresh</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" style={buttonStyle} onClick={handleAddClick}>Add</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" style={buttonStyle} onClick={handleEditClick}>Edit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" style={deleteButtonStyle} onClick={handleDeleteClick}>Delete</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
