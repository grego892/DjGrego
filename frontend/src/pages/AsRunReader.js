import React, { useState, useCallback } from 'react';
import { DataGrid, Row } from 'react-data-grid';
import { useTheme } from '@mui/material/styles';
// ⬅️  Row import added
import Papa from 'papaparse';
import 'react-data-grid/lib/styles.css';
import './AsRunReader.css';                               // ⬅️  custom styles

// Define column structure based on the log format
const COLUMNS = [
  { key: 'status', name: '', width: 3 },
  { key: 'playedtime', name: 'Played Time', width: 80 },
  { key: 'schedtime', name: 'Sched Time', width: 80 },
  { key: 'duration', name: 'Duration', width: 80 },
  { key: 'event', name: 'Event', width: 500 },
  { key: 'filename', name: 'Filename', width: 200 },
  { key: 'passthrough', name: 'PassTh', width: 70 },
  { key: 'logposition', name: 'Position', width: 80 },
  { key: 'eventtype', name: 'Event Type', width: 110 },
  { key: 'folder', name: 'Folder', width: 100 },
  { key: 'loadedfrom', name: 'Loaded From', width: 100 },
  { key: 'datetime', name: 'datetime', width: 180 }
];

export default function AsRunReader() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

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
        playedtime: row[1] || '',
        logposition: row[2] || '',
        passthrough: row[3] || '',
        schedtime: row[4] || '',
        filename: row[5] || '',
        dunno: row[6] || '',
        event: row[7] || '',
        longfilename: row[8] || '',
        dunno2: row[9] || '',
        eventtype: row[10] || '',
        folder: row[11] || '',
        loadedfrom: row[12] || '',
        datetime: row[13] || '',
        duration: row[14] || '',
      };
    });

    setRows(parsedRows);
  }

  // ---------- helper ---------------------------------------------------------
function getRowClass(row) {
  // trim whitespace and compare in one consistent case
  const type   = (row.eventtype || '').trim().toUpperCase();
  const status = (row.status     || '').trim().toUpperCase();

  switch (type) {
    case 'MACRO':     return 'row-macro';
    case 'COMMENT':   return 'row-comment';
    case 'AUDIO':     return 'row-audio';
    case 'WARNING':   return 'row-warning';
    case 'TRIGGER':   return 'row-trigger';
    case 'TIME':      return 'row-time';
    case 'SCHEDULED': return 'row-scheduled';
    case 'INFO':      return 'row-info';
    case 'VOICETRACKS': return 'row-vtrack';
    case 'MUSIC':     return 'row-music';
    case 'VTRACK':    return 'row-vtrack';
    case 'ERROR':     return 'row-error';
    case 'SPOTS':     return 'row-spots';
    case 'CARTS':   return 'row-carts';
    case 'FILL':      return 'row-fill';
    default:
      return status === 'S' ? 'row-status-s' : '';
  }
}





  return (

    <div style={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      padding: 8,
            backgroundColor: isDarkMode ? theme.palette.background.default : undefined,
      color: isDarkMode ? theme.palette.text.primary : undefined,
    }}>
      <div>
        <input
          type="file"
          accept=".log"
          onChange={handleFileChosen}
          style={{
            padding: '8px',
            border: `1px solid ${isDarkMode ? theme.palette.divider : '#ccc'}`,
            borderRadius: '4px',
            marginBottom: '4px'
          }}
        />
      </div>

      {loading && <div>Loading...</div>}

      {rows.length === 0 && !loading ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
            background: isDarkMode ? theme.palette.background.paper : '#f5f5f5',
            color: isDarkMode ? theme.palette.text.primary : undefined,
            borderRadius: '4px'
        }}>
          Please upload a .log file to view its contents
        </div>
      ) : (
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>

        <DataGrid
          columns={COLUMNS}
          rows={rows}
          rowClass={getRowClass}
          defaultColumnOptions={{ resizable: true, sortable: true }}
          className="rdg-light"
          style={{ height: '100%' }}
        />

        </div>
      )}
    </div>
  );
}