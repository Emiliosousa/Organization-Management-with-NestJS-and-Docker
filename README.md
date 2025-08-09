# Organization Management Platform with NestJS and Docker

## Overview
A backend platform built with **NestJS** and designed to run seamlessly in **Docker** containers.  
It provides a secure environment for:
- Managing organizations
- Handling public/private key pairs
- Storing and retrieving associated documents
- Managing roles and permissions

The project includes RESTful API endpoints, example datasets, and environment configurations for rapid deployment.

---

## Requirements
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  
- `bash` shell (for running test scripts)  

---

## Installation & Running

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Build and run with Docker
```bash
docker-compose up --build
```

This will start all necessary services for the API.

---

## How to Test the API

Once the application is running, you can use the provided shell scripts to execute API requests quickly.

### From Delivery 1 (basic repository operations)
```bash
cd delivery1
chmod +x repository_commands
./repository_commands
```

### From Delivery 2 (extended operations and permissions)
```bash
cd delivery2
chmod +x test_commands.sh
./test_commands.sh
```

These scripts execute a predefined sequence of API calls, including:
- Creating organizations
- Adding documents
- Managing roles and permissions
- Retrieving files

You can also open the scripts and run each command individually to better understand how the API works.

---

## Project Structure
```
delivery1/   # Initial repository setup & basic operations
delivery2/   # Extended functionality and permission management
scripts/     # Individual shell scripts for specific API actions
Dockerfile   # Docker container setup
docker-compose.yml  # Service orchestration
```

---

## License
[MIT License](LICENSE) – Free to use, modify, and distribute.
