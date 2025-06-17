import React, { useState, useCallback } from 'react';
import { DataGrid } from 'react-data-grid'; // Changed this line to use named import
import Papa from 'papaparse';
import 'react-data-grid/lib/styles.css';


// Define column structure based on the log format
const COLUMNS = [
  { key: 'status', name: 'Status', width: 60 },
  { key: 'time', name: 'Time', width: 80 },
  { key: 'dunno', name: 'dunno', width: 80 },
  { key: 'passthrough', name: 'PassThrough', width: 70 },
  { key: 'schedtime', name: 'Shed Time', width: 80 },
  { key: 'event', name: 'Event', width: 500 },
  { key: 'category', name: 'Category', width: 80 },
  { key: 'filename', name: 'filename', width: 200 },
  { key: 'position', name: 'Position', width: 80 },
  { key: 'title', name: 'title', width: 100 },
  { key: 'subcategory', name: 'Subcategory', width: 100 },
  { key: 'source', name: 'Source', width: 100 },
  { key: 'modified', name: 'Modified', width: 150 },
  { key: 'duration', name: 'Duration', width: 100 }
];

export default function AsRunReader() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChosen = useCallback(event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.log')) {
      alert('Please choose a *.log file');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = e => {
      const fileText = e.target.result;
      parseLogText(fileText);
      setLoading(false);
    };
    reader.readAsText(file);
  }, []);

  function parseLogText(text) {
    const { data } = Papa.parse(text, {
      delimiter: ',',
      newline: '\n',
      skipEmptyLines: true,
      quoteChar: '"'
    });

    // Transform the data into rows with named columns
    const parsedRows = data.map((row, index) => {
      return {
        id: index,
        status: row[0] || '',
        time: row[1] || '',
        dunno: row[2] || '',
        passthrough: row[3] || '',
        schedtime: row[4] || '',
        type: row[5] || '',
        category: row[6] || '',
        event: row[7] || '',
        position: row[8] || '',
        title: row[9] || '',
        subcategory: row[10] || '',
        source: row[11] || '',
        modified: row[12] || '',
        duration: row[13] || ''
      };
    });

    setRows(parsedRows);
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 16
    }}>
      <div>
        <input
          type="file"
          accept=".log"
          onChange={handleFileChosen}
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '16px'
          }}
        />
      </div>

      {loading && <div>Loading...</div>}

      {rows.length === 0 && !loading ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          background: '#f5f5f5',
          borderRadius: '4px'
        }}>
          Please upload a .log file to view its contents
        </div>
      ) : (
        <div style={{ flex: 1, height: 'calc(100vh - 150px)' }}>
          <DataGrid
            columns={COLUMNS}
            rows={rows}
            defaultColumnOptions={{
              resizable: true,
              sortable: true
            }}
            className="rdg-light"
          />
        </div>
      )}
    </div>
  );
}