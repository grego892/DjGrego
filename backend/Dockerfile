FROM ubuntu:latest
LABEL authors="gregdavis"

ENTRYPOINT ["top", "-b"]



# Use an official Python runtime
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install system dependencies if needed (e.g., for audio or database drivers)
RUN apt-get update && apt-get install -y gcc ffmpeg && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start the FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]