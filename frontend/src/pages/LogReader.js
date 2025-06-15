import React, { useState } from 'react';
import {
  Button,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import the MUI color palettes
import { teal, green, blue, cyan, purple, yellow } from '@mui/material/colors';

function LogReader() {
  const [logData, setLogData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });

  // build your Colors lookup
  const Colors = {
    Teal:    { Default: teal[500] },
    Green:   { Default: green[500] },
    Blue:    { Lighten1: blue[300], Default: blue[500] },
    Cyan:    { Default: cyan[500] },
    Purple:  { Lighten2: purple[200] },
    Yellow:  { Darken2: yellow[700] },
  };

  // prioritized row‐styling rules
  const getRowClassName = (params) => {
    const cat = params.row.category?.toUpperCase() || '';
    const frm = params.row.from?.toUpperCase()     || '';
    if (cat === 'MACRO' && frm === 'CLOCKS')      return 'row-macro-clocks';
    else if (frm === 'TRAFFIC')                   return 'row-traffic';
    else if (cat === 'AUDIO' && frm === 'CLOCKS') return 'row-audio-clocks';
    else if (cat === 'MACRO')                     return 'row-macro';
    else if (cat === 'COMMENT')                   return 'row-comment';
    else if (cat === '' && frm === 'MUSIC')       return 'row-music';
    else if (cat === 'VTRACK')                    return 'row-vtrack';
    else                                           return 'row-default';
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
      <Box sx={{ p: 3, height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" component="label" sx={{ mb: 3, width: 200 }}>
          Upload XML File
          <input type="file" accept=".xml" hidden onChange={handleFileUpload} />
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
              '& .MuiDataGrid-main': { overflow: 'auto' },
              // your new row color rules
              '& .row-macro-clocks':    { backgroundColor: Colors.Teal.Default },
              '& .row-traffic':         { backgroundColor: Colors.Green.Default },
              '& .row-audio-clocks':    { backgroundColor: Colors.Blue.Lighten1 },
              '& .row-macro':           { backgroundColor: Colors.Cyan.Default },
              '& .row-comment':         { backgroundColor: Colors.Purple.Lighten2 },
              '& .row-music':           { backgroundColor: Colors.Blue.Default },
              '& .row-vtrack':          { backgroundColor: Colors.Yellow.Darken2 },
              '& .row-default':         { backgroundColor: '#000000', color: '#ffffff' },
              // keep hover state locked to the same bg
              '& .MuiDataGrid-row:hover': { backgroundColor: 'inherit !important' },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LogReader;