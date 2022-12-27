#!/bin/env bash

echo "Starting"

# Check if current directory is correct, npm and psql command exists
if ! [ -f "lab-jarkom.service" ]; then
    # If the file does not exist, warns user to enter the project's directory
    echo "Run this script within the project's scripts directory"
    exit 1
elif ! [ -x "$(command -v npm)" ]; then
    # Output message to install Node.js and npm
    echo "The npm command is not found. Please install Node.js and npm to continue."
    exit 1
elif ! [ -x "$(command -v psql)" ]; then
    # Output message to install PostgreSQL
    echo "The psql command is not found. Please install PostgreSQL to continue."
    exit 1
elif ! [ -d "../../lab-jarkom-fe" ]; then
    # Remind user to give the project's directory name "lab-jarkom-fe"
    echo "Please give the project's directory name \"lab-jarkom-fe\""
    exit 1
fi

# Remove older project revision if exist
if [ -d "/opt/lab-jarkom-fe" ]; then
    echo "removing older project revision"
    sudo rm -rf /opt/lab-jarkom-fe -rf
fi

# Copy project's directory to /opt
sudo cp ../../lab-jarkom-fe /opt/ -rfv

# Copy systemd service
sudo cp lab-jarkom.service /etc/systemd/system/ -fv

# Reload systemd daemon
sudo systemctl daemon-reload

# Enable and run the service
sudo systemctl enable --now lab-jarkom.service