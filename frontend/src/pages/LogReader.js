import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

function LogReader() {
  const [logData, setLogData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });
  
  // Define color mapping for categories and sources
  const categoryColors = {
    'MACRO': '#e3f2fd',  // light blue
    'COMMERCIAL': '#fff3e0', // light orange
    'PROMO': '#e8f5e9',    // light green
    'NEWS': '#fce4ec',     // light pink
  };

  const fromColors = {
    'LIVE': '#ffebee',     // light red
    'RECORDED': '#f3e5f5', // light purple
    'AUTO': '#e0f7fa',     // light cyan
    'TRAFFIC': '#e8f5e9'
  };

  const getRowClassName = (params) => {
    const category = params.row.category?.toUpperCase();
    const from = params.row.from?.toUpperCase();
    return `category-${category} from-${from}`;
  };
  
  const theme = createTheme();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'scheduled', headerName: 'Scheduled', width: 130 },
    { field: 'actual', headerName: 'Actual', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'length', headerName: 'Length', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'from', headerName: 'From', width: 130 },
    { field: 'description', headerName: 'Description', width: 300 },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlText = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const items = xmlDoc.getElementsByTagName('TProgramLogItem');
      
      const rows = Array.from(items).map((item, index) => ({
        id: index,
        scheduled: item.getElementsByTagName('Scheduled')[0]?.textContent || '',
        actual: item.getElementsByTagName('Actual')[0]?.textContent || '',
        name: item.getElementsByTagName('Name')[0]?.textContent || '',
        length: item.getElementsByTagName('Length')[0]?.textContent || '',
        category: item.getElementsByTagName('Category')[0]?.textContent || '',
        from: item.getElementsByTagName('From')[0]?.textContent || '',
        description: item.getElementsByTagName('Description')[0]?.textContent || '',
      }));

      setLogData(rows);
    };

    reader.readAsText(file);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          p: 3, 
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >

        <Button
          variant="contained"
          component="label"
          sx={{ mb: 3,
          width: '200px' }}
        >
          Upload XML File
          <input
            type="file"
            accept=".xml"
            hidden
            onChange={handleFileUpload}
          />
        </Button>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <DataGrid
            rows={logData}
            columns={columns}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[100]}
            rowCount={logData.length}
            getRowClassName={getRowClassName}
            sx={{
              height: '100%',
              '& .MuiDataGrid-main': {
                overflow: 'auto'
              },
              // Category-based colors
              ...Object.entries(categoryColors).reduce((acc, [category, color]) => ({
                ...acc,
                [`& .category-${category}`]: {
                  backgroundColor: color,
                  '&:hover': {
                    backgroundColor: `${color} !important`,
                  },
                },
              }), {}),
              // From-based colors (as border or accent)
              ...Object.entries(fromColors).reduce((acc, [from, color]) => ({
                ...acc,
                [`& .from-${from}`]: {
                  borderLeft: `6px solid ${color}`,
                },
              }), {}),
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LogReader;