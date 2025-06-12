import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import xml.etree.ElementTree as ET
from io import StringIO

class LogItem(BaseModel):
    scheduled: str
    actual: str
    name: str
    length: str
    category: str
    from_source: str
    description: str

app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-log")
async def upload_log(file: UploadFile = File(...)):
    content = await file.read()
    xml_content = content.decode()
    
    # Parse XML
    tree = ET.parse(StringIO(xml_content))
    root = tree.getroot()
    
    # Extract program log items
    log_items = []
    for item in root.findall('.//TProgramLogItem'):
        log_item = LogItem(
            scheduled=item.find('Scheduled').text if item.find('Scheduled') is not None else '',
            actual=item.find('Actual').text if item.find('Actual') is not None else '',
            name=item.find('Name').text if item.find('Name') is not None else '',
            length=item.find('Length').text if item.find('Length') is not None else '',
            category=item.find('Category').text if item.find('Category') is not None else '',
            from_source=item.find('From').text if item.find('From') is not None else '',
            description=item.find('Description').text if item.find('Description') is not None else ''
        )
        log_items.append(log_item)
    
    return {"log_items": log_items}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)