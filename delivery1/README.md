# Group members
- Adrián Murillo Moreno (123480)
- Alisa Gudovskaja (123501)
- Emilio Sousa Gutierrez (123599)
- Carlos Martinez Fariza (123549)


# Project description
- local_commands.py: It is the code in charge of creating the pair of keys, public and private.
- repository_commands.py
    - create_org(organization, username, name, email, public_key_file): Create a new organization (user), through the data provided by a .json file, this organization is later saved in a directory, to later register with that email and password
    - list_org(): Read and view all organization directory documents.
    - create_session(organization, username, password, credentials_file, session_file): Start a new session for an organization, creating a unique ID
    - download_file(file_handle): Allows you to download a specific file, after giving it its name
    - subject_credentials(password, credentials_file)
    - decrypt_file(encrypted_file, encryption_metadata)
    - get_file(file_handle, file)
    - list_subjects(session_file)
    - list_docs(session_file, username, date)
    - add_subject(session_file, username, name, email, credentials_file)
    - add_doc(session_file, document_name, file)
    - get_doc_metadata(session_file, document_name)
    - get_doc_file(session_file, document_name, file)
    - suspend_subject(session_file, username)
    - 
- config.py: is used to configure certain important project values, such as the server address and public key
- state_management.py: With this code we manage the state of the application using the state.json file to store and load persistent configurations.
    - load_state(): load state from state.json file,
    - parse_env(state): Modifies the loaded state based on the environment variables, allowing values ​​to be overwritten.
    - save_state(state): save the state of the machine in the state.json file
- state.json: File where data necessary for the application to function correctly is stored, and which can persist between different executions.
- test_state.py: Verify that the functions in the state management.py file work correctly



# Executing the code
To execute each of the previous functions, we have created a shell for each one where you call them, depending on one function or another you will have to pass it x parameters. But before executing all of them you have to give it permissions.
They start by doing chmod +x n_file.
Below we will show a list with all the executables and indicating how many and what parameters should be provided.
- rep_active_subject  (It runs as ./rep_active_subject <session_file> <username>) 
- rep_add_docs (It runs as ./rep_add_docs <session_file> <document_name> <file>) 
- rep_add_subject (It runs as ./rep_add_subject <session_file> <username> <name> <email> <credentials_file>)
- rep_create_org (It runs as ./rep_create_org <organization> <username> <name> <email> <public_key_file>)
- rep_create_sessions (It runs as ./rep_create_sessions <organization> <username> <password> <credentials_file> <session_file>)
- rep_decrypt_file(It runs as ./rep_decryot_file <encrypted_file> <encryption_metadata>)
- rep_get_doc_file(It runs as ./rep_get_doc_file <session_file> <document_name> <file> )
- rep_get_doc_metadata(It run as ./rep_get_doc_metadata <session_file> <document_name>)
- rep_get_file(It run as ./rep_get_file <file_handle> <file>)
- rep_list_docs(It run as ./rep_list_docs <session_file> <username> <date>)
- rep_list_orgs(It run as ./rep_list_orgs )
- rep_list_subject(It run as ./rep_list_subject <session_file>)
- rep_subject_credentials(It run as ./rep_subject_credentials <password> <credentials_file>)
- rep_suspend_subject(It run as ./rep_suspend_subject <session_file> <username>)

# Examples of test commands