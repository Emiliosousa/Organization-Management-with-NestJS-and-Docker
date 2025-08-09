
# SIO 2425 Project - Security of Information and Organizations

This project implements an API and a set of commands to manage subjects, roles, permissions, and documents within a secure system. The backend is built using **NestJS**, a framework that leverages TypeScript and Node.js to provide a robust and scalable architecture. This README explains how to set up the environment, run the system, and use the commands implemented in the project's test script.

---
# Group members
- Adrian Murillo Moreno (123480) adrianmurillo@ua.pt
- Emilio sousa gutierrez (123599) emiliosousa@ua.pt
- Carlos Martinez Fariza (123549)
- Alisa Gudovskaja (123501)



## Requirements

1. **Docker and Docker Compose**: Ensure Docker and Docker Compose are installed on your machine.
   - [Install Docker](https://docs.docker.com/get-docker/)
   - [Install Docker Compose](https://docs.docker.com/compose/install/)

2. **Docker Desktop Application**: Make sure the Docker application is running before executing the commands.

3. **Git Bash (for Windows)**: The project is tested using Git Bash as the terminal.

4. **jq**: A tool for manipulating JSON.
   - Install using Git Bash:
     ```bash
     winget install jq
     ```
     Alternatively, you can download jq from its official website: [https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
   - After installation, restart the terminal.

---

## NestJS in the Project

This project uses **NestJS** to structure and implement the backend. The main features of NestJS utilized include:

1. **Modular Architecture**:
   - The application is divided into well-organized modules for authentication, subjects, roles, permissions, and documents. Each module encapsulates its own logic, making the codebase more maintainable.

2. **TypeScript**:
   - The use of TypeScript ensures type safety and enhances developer productivity by catching errors during development.

3. **Dependency Injection**:
   - NestJS's built-in dependency injection simplifies the management of services and their dependencies across modules.

4. **RESTful API Design**:
   - The API follows RESTful principles, providing clear and predictable endpoints for managing entities.

5. **Middleware and Guards**:
   - Middleware is used for request logging and data processing.
   - Guards are implemented to handle authentication and authorization, ensuring secure access to API endpoints.

6. **Validation and Error Handling**:
   - DTOs (Data Transfer Objects) and validation pipes ensure that only valid data is processed by the API.
   - Errors are consistently handled and returned in a standardized format.

---

## Setting Up the Environment

1. **Start the Docker Services**:
   Run the following command to start all necessary services:
   ```bash
   docker-compose up
   ```

2. **Verify the Containers Are Running**:
   Use the following command to check active containers:
   ```bash
   docker ps
   ```

3. **Access the API**:
   The API is the backbone of this system and provides endpoints to manage subjects, roles, permissions, and documents. You can view and interact with the API by visiting its URL in your browser or using an API client like Postman. Typically, the API will be available at `http://localhost:<port>` (replace `<port>` with the port defined in your `docker-compose.yml` file).

   ### Example API Endpoints:
   - **Authentication**:
     - `POST /auth/login`: Log in and obtain a session token.
     - `POST /auth/logout`: Log out and invalidate the current session.
   - **Subjects**:
     - `GET /subjects`: List all subjects.
     - `POST /subjects`: Add a new subject.
     - `PUT /subjects/:id/suspend`: Suspend a specific subject.
   - **Roles**:
     - `GET /roles`: List all roles.
     - `POST /roles`: Add a new role.
     - `PUT /roles/:id/reactivate`: Reactivate a suspended role.
   - **Documents**:
     - `POST /documents`: Upload a new document.
     - `GET /documents`: Retrieve a list of documents.
     - `DELETE /documents/:id`: Delete a specific document.

   You can use tools like `curl` or Postman to test these endpoints directly.

---

## Commands in `test_commands.sh`

The `test_commands.sh` script tests various features of the system. Below is a breakdown of the commands executed in the script:

### 1. Generate Public and Private Keys
Generates public and private keys for a subject.
```bash
sh ./rep_subject_credentials.sh <username>
```

### 2. Create an Auxiliary Organization
Creates a new organization with the specified parameters.
```bash
sh ./rep_create_org.sh <org_name> <username> <password> <email> <path_to_public_key>
```

### 3. Create a Session
Establishes a session for the specified user.
```bash
sh ./rep_create_session.sh <username> <password>
```

### 4. List Roles
Lists all roles for the current session.
```bash
sh ../scripts/authenticated/rep_list_roles.sh ../scripts/anonymus/.session
```

### 5. Add a Role
Adds a new role with specified permissions to the organization.
```bash
sh ./rep_add_role.sh ../anonymus/.session LECTOR "[DOC_NEW, DOC_READ]"
```

### 6. List Subjects
Lists all subjects in the organization.
```bash
sh ./rep_list_subjects.sh ../anonymus/.session
```

### 7. Add a Document
Adds a new document to the organization with encryption.
```bash
sh ./rep_add_doc.sh ../anonymus/.session prueba ../../delivery2/testfile.txt aes-256-cbc ../local/pub.key
```

### 8. Assign a Role to a Subject
Assigns a specified role to a subject.
```bash
sh ./rep_assign_role_to_subject.sh ../scripts/anonymus/.session LECTOR hola
```

### 9. List Documents
Lists all documents in the organization.
```bash
sh ./rep_list_docs.sh ../anonymus/.session
```

### 10. Download a Document
Downloads an encrypted document from the organization.
```bash
sh ./rep_get_file.sh 1 prueba_downloaded.enc
```

### 11. Suspend and Reactivate a Role
Suspends a specified role.
```bash
sh ./rep_suspend_role.sh ../anonymus/.session LECTOR
```
Reactivates the suspended role.
```bash
sh ./rep_reactivate_role.sh ../anonymus/.session LECTOR
```

### 12. List Permissions for a Role
Lists all permissions associated with a role.
```bash
sh ./rep_list_role_permissions.sh ../anonymus/.session LECTOR
```

### 13. List Subjects for a Role
Lists all subjects associated with a role.
```bash
sh ./rep_list_role_subjects.sh ../anonymus/.session OWNER
```

### 14. Remove a Role from a Subject
Removes a specified role from a subject.
```bash
sh ./rep_remove_role_to_subject.sh ../scripts/anonymus/.session LECTOR hola
```

### 15. Modify Role Permissions
Removes a permission from a role.
```bash
sh ./rep_remove_permission.sh ../anonymus/.session lector DOC_ACL
```
Adds a permission to a role.
```bash
sh ./rep_add_permission.sh ../anonymus/.session lector DOC_ACL
```

### 16. List All Roles of a Subject
Lists all roles assigned to a specific subject.
```bash
sh ./rep_list_subject_roles.sh ../anonymus/.session "hola"
```

### 17. List Permission Roles
Lists all roles associated with a specific permission.
```bash
sh ./rep_list_permission_roles.sh ../anonymus/.session SUBJECT_UP
```

### 18. Drop a Role
Deletes a specified role from the organization.
```bash
sh ./rep_drop_role.sh ../anonymus/.session
```

---

## Project Structure

- **`delivery1`, `delivery2`, `delivery3`**: Folders containing scripts and configurations for each project phase.
- **`docker-compose.yml`**: Configuration file for Docker services.
- **`scripts`**: Contains all test and operational scripts.
- **`uploads`**: Directory for uploaded documents.

---

For further details about the API or commands, refer to the source code in the `src` folder.

