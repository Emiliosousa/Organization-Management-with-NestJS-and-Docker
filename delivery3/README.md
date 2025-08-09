# Delivery 3: Project Report and Security Analysis

## Part 1: Project Features and Decisions

### Implemented Features

1. *Document Repository*:
   - The system provides secure storage for documents using encryption techniques.
   - Each document includes metadata for management purposes, such as ACLs (Access Control Lists), document creator, and creation date.
   - Documents are stored in an encrypted format with metadata that separates public and restricted information.

2. *Access Control*:
   - Role-based access control (RBAC) ensures that only authorized users have access to specific documents or actions.
   - Roles are assigned specific permissions such as read, write, or manage ACLs for documents.
   - ACLs define granular permissions at both the organizational and document levels.

3. *Session Management*:
   - Secure session handling is implemented to ensure authenticated access.
   - Sessions are tied to user identities and validated with cryptographic tokens.
   - Expired or invalid sessions are automatically terminated.

4. *Organization Management*:
   - The system supports multiple organizations, each with its own ACLs and management policies.
   - Organizations can manage their own users, assign roles, and control document access independently.

5. *API Structure*:
   - The API is divided into anonymous, authenticated, and authorized endpoints.
   - Anonymous APIs allow access to public information without authentication.
   - Authenticated APIs verify user identity but restrict access based on roles.
   - Authorized APIs enforce strict role-based controls for sensitive operations.

6. *System Architecture*:
   - The application is built using *NestJS*, a powerful and scalable framework for building server-side applications.
   - It is deployed using *Docker Compose*, ensuring consistent and isolated environments for development and production.
   - The database layer is powered by *MariaDB*, providing robust and efficient data storage and management.
   - The integration of NestJS with Docker Compose and MariaDB enables a highly modular and maintainable architecture, optimized for scalability and performance.

### Decisions Made

1. *Encryption Standards*:
   - The system uses AES-256 for encrypting documents.
   - Encryption keys are managed securely and associated with individual sessions.

2. *Role Management*:
   - Roles are predefined with clear permissions to avoid ambiguity.
   - Only administrators have the ability to create or modify roles.

3. *Separation of Metadata and Content*:
   - Metadata is stored separately from encrypted document content to enhance security.
   - This separation also simplifies access management.

4. *Dockerized Environment*:
   - Docker and Docker Compose are used to ensure consistent deployment across development, staging, and production environments.

5. *Scalable Framework*:
   - NestJS was chosen for its modular architecture and built-in support for TypeScript, enabling clean and maintainable code.

6. *Database Choice*:
   - MariaDB was selected for its compatibility with MySQL and its performance optimizations, ensuring reliable data storage and queries.

7. *Compliance with Standards*:
   - The implementation follows best practices outlined in OWASP ASVS for access control, session management, and cryptographic storage.

## Part 2: Security Analysis (V4 - Access Control Verification Requirements)

### Overview
This analysis evaluates the project against OWASP ASVS Chapter V4: Access Control Verification Requirements. Each control is examined to determine its applicability, justification for inclusion or exclusion, and evidence provided where relevant.

### V4.1 General Access Control Design

*V4.1.1*: Verify that the application enforces access control decisions based on the authenticated user’s role or other attributes.
- *Applicability*: Applicable.
- *Evidence*: Role-based access control (RBAC) is implemented, and access to documents and organizational features is determined by user roles and permissions defined in the ACL.

*V4.1.2*: Verify that the application does not rely solely on client-side access control checks to enforce access control decisions.
- *Applicability*: Applicable.
- *Evidence*: All access control checks are implemented server-side to ensure that decisions cannot be tampered with by the client.

*V4.1.3*: Verify that access control rules are applied throughout the application and do not allow unauthorized access.
- *Applicability*: Applicable.
- *Evidence*: Every API endpoint enforces role-based access control, and unauthorized access is rejected with detailed error messages.

### V4.2 Operation-Level Access Control

*V4.2.1*: Verify that users can only access resources and perform actions explicitly authorized for their roles.
- *Applicability*: Applicable.
- *Evidence*: Permissions are tied to roles, and only users assigned specific roles can perform actions such as document upload or deletion.

*V4.2.2*: Verify that sensitive operations require explicit authorization.
- *Applicability*: Applicable.
- *Evidence*: Sensitive actions, such as modifying ACLs or deleting documents, are restricted to users with explicit permissions.

### V4.3 Role Management

*V4.3.1*: Verify that roles can be securely assigned, modified, and revoked.
- *Applicability*: Applicable.
- *Evidence*: APIs for managing roles are protected, and only administrators have the required permissions to modify roles.

*V4.3.2*: Verify that roles are tied to specific permissions and cannot exceed their scope.
- *Applicability*: Applicable.
- *Evidence*: Each role is predefined with a fixed set of permissions. Attempts to perform actions outside the scope of a role are rejected.

*V4.3.3*: Verify that roles and permissions are reviewed regularly.
- *Applicability*: Not yet implemented.
- *Justification*: While role review is planned, it is not currently automated or documented in the system.

### V4.4 Access Control Enforcement

*V4.4.1*: Verify that access control decisions are logged to enable auditing.
- *Applicability*: Partially Applicable.
- *Evidence*: Logs are maintained for sensitive operations, but general access logs are not fully implemented.

*V4.4.2*: Verify that sensitive actions require re-authentication or secondary confirmation.
- *Applicability*: Not Applicable.
- *Justification*: The system does not include operations that require re-authentication as part of its workflow.

