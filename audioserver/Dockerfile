FROM debian:stable-slim

WORKDIR /app

# Install build-essential if you need to build
RUN apt-get update && apt-get install -y build-essential ffmpeg libpq-dev

# Copy source code
COPY . .

# Build the C program (replace player.c with your file)
RUN gcc -o player player.c -lpq

# Expose a port if your program needs one (optional)
# EXPOSE 9000

# Command to run your player (change as needed)
CMD ["./player"]