import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


class Song(BaseModel):
    name: str


class Songs(BaseModel):
    songs: List[Song]


app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"songs": []}


@app.get("/songs", response_model=Songs)
def get_songs():
    return Songs(songs=memory_db["songs"])


@app.post("/songs")
def add_song(song: Song):
    memory_db["songs"].append(song)
    return song


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)