import React, { useState, useCallback } from "react";
import { DataGrid } from "react-data-grid";
import { useTheme } from '@mui/material/styles';
import 'react-data-grid/lib/styles.css';

const COLUMNS = [
  { key: "id", name: "ID", width: 100, resizable: true, frozen: true },
  { key: "Time", name: "Time", width: 140, resizable: true },
  { key: "PID", name: "PID", width: 80, resizable: true },
  { key: "Event", name: "Event Details", width: 570, resizable: true }
];

function parseLogLine(line) {
  const logRegex = /^(\d+)\s+(\d{1,2}:\d{2}:\d{2}\.\d{3}\s(?:AM|PM))\s+\[(\d+)\]\s([^\:]+?)(?::\s*(.*))?$/;
  const match = line.match(logRegex);
  if (match) {
    const [, id, time, pid, event, details] = match;
    return {
      id,
      Time: time,
      PID: pid,
      Event: details ? `${event.trim()}: ${details.trim()}` : event.trim()
    };
  }
  return { id: line, Time: "", PID: "", Event: line };
}

function DebugReader() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleFileChosen = useCallback(event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.log')) {
      alert('Please choose a .log file');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/);
      const parsed = lines.filter(Boolean).map(parseLogLine);
      setRows(parsed);
      setLoading(false);
    };
    reader.onerror = () => {
      alert('Failed to read file');
      setLoading(false);
    };
    reader.readAsText(file);
  }, []);

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
            marginBottom: '4px',
            backgroundColor: isDarkMode ? theme.palette.background.paper : undefined,
            color: isDarkMode ? theme.palette.text.primary : undefined,
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
            defaultColumnOptions={{ resizable: true, sortable: true }}
            className={isDarkMode ? "rdg-dark" : "rdg-light"}
            style={{
              height: '100%',
              backgroundColor: isDarkMode ? theme.palette.background.paper : undefined,
              color: isDarkMode ? theme.palette.text.primary : undefined,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DebugReader;