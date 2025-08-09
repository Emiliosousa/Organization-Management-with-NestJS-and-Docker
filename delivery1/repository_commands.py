import os
import json
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# Función para crear las credenciales del sujeto (clave pública y privada)
def rep_subject_credentials(password, credentials_file):
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    public_key = private_key.public_key()
    with open(credentials_file, "wb") as pub_file:
        pub_file.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ))
    print(f"Clave pública guardada en {credentials_file}")

# Desencriptar un archivo
def rep_decrypt_file(encrypted_file, encryption_metadata):
    with open(encrypted_file, 'rb') as file:
        encrypted_data = file.read()
    print("Contenido desencriptado: ", encrypted_data)  # Aquí deberías usar el metadata para el descifrado real.


# Crear una organización
def rep_create_org(organization, username, name, email, public_key_file):
    org_data = {
        'organization': organization,
        'username': username,
        'name': name,
        'email': email,
        'public_key': public_key_file
    }
    # Si no existe el archivo, lo creamos como una lista
    if not os.path.exists('organizations.json'):
        with open('organizations.json', 'w') as file:
            json.dump([org_data], file)
    else:
        with open('organizations.json', 'r+') as file:
            orgs = json.load(file)
            orgs.append(org_data)
            file.seek(0)
            json.dump(orgs, file)
    print(f"Organización {organization} creada con el usuario {username}")


# Listar organizaciones
def rep_list_orgs():
    if not os.path.exists('organizations.json'):
        print("No hay organizaciones registradas.")
        return
    with open('organizations.json', 'r') as file:
        orgs = json.load(file)
    for org in orgs:
        print(f"Organización: {org['organization']}")

# Crear una sesión
def rep_create_session(organization, username, password, credentials_file, session_file):
    session_data = {
        "organization": organization,
        "username": username,
        "password": password,
        "credentials_file": credentials_file
    }
    with open(session_file, 'w') as file:
        json.dump(session_data, file)
    print(f"Sesión para {username} en la organización {organization} creada con éxito.")

# Obtener un archivo por su handle (Voy por aqui)
def rep_get_file(file_handle, file=None):
    if file:
        with open(file, 'rb') as file_obj:
            print(file_obj.read())
    else:
        print(f"Archivo con handle {file_handle} descargado.")


# Listar los sujetos de la sesión
def rep_list_subjects(session_file):
    if not os.path.exists(session_file):
        print("Archivo de sesión no encontrado.")
        return
    
    with open(session_file, 'r') as file:
        session_data = json.load(file)
    
    print(f"Sujeto(s) en la organización {session_data['organization']}:")
    
    # Comprobar si hay sujetos y listarlos
    if "subjects" in session_data and session_data["subjects"]:
        for subject in session_data["subjects"]:
            print(f"- {subject['username']} (Nombre: {subject['name']}, Estado: {subject['status']})")
    else:
        print("No hay sujetos registrados.")


# Listar documentos
def rep_list_docs(session_file, username=None, date=None):
    if not os.path.exists(session_file):
        print("Archivo de sesión no encontrado.")
        return
    print("Lista de documentos de la organización.")
    # Aquí podrías filtrar por fecha o sujeto si es necesario

# Agregar un sujeto a la sesión
def rep_add_subject(session_file, username, name, email, credentials_file):
    if not os.path.exists(session_file):
        print("Archivo de sesión no encontrado.")
        return
    
    with open(session_file, 'r+') as file:
        session_data = json.load(file)
        
        # Crear un nuevo sujeto
        new_subject = {
            "username": username,
            "name": name,
            "email": email,
            "credentials_file": credentials_file,
            "status": "active"
        }
        
        # Agregarlo a la lista de sujetos
        if "subjects" not in session_data:
            session_data["subjects"] = []
        
        session_data["subjects"].append(new_subject)
        
        # Guardar los cambios
        file.seek(0)
        json.dump(session_data, file, indent=4)
    
    print(f"Sujeto {username} añadido a la sesión.")

# Agregar un documento
def rep_add_doc(session_file, document_name, file):
    print(f"Documento {document_name} agregado a la organización desde {file}.")

# Obtener metadatos de un documento
def rep_get_doc_metadata(session_file, document_name):
    print(f"Metadatos del documento {document_name} obtenidos.")

# Obtener archivo de un documento
def rep_get_doc_file(session_file, document_name, file=None):
    rep_get_doc_metadata(session_file, document_name)
    rep_get_file(document_name, file)


def rep_suspend_subject(session_file, username):
    if not os.path.exists(session_file):
        print("Archivo de sesión no encontrado.")
        return
    
    with open(session_file, 'r+') as file:
        session_data = json.load(file)
        
        for subject in session_data.get("subjects", []):
            if subject["username"] == username:
                subject["status"] = "suspended"
                print(f"Sujeto {username} suspendido.")
                file.seek(0)
                json.dump(session_data, file, indent=4)
                return
        
        print(f"Sujeto {username} no encontrado.")


def rep_activate_subject(session_file, username):
    if not os.path.exists(session_file):
        print("Archivo de sesión no encontrado.")
        return
    
    with open(session_file, 'r+') as file:
        session_data = json.load(file)
        
        for subject in session_data.get("subjects", []):
            if subject["username"] == username:
                subject["status"] = "active"
                print(f"Sujeto {username} activado.")
                file.seek(0)
                json.dump(session_data, file, indent=4)
                return
        
        print(f"Sujeto {username} no encontrado.")

import sys
# Función principal para manejar los comandos
def main():
    if len(sys.argv) < 2:
        print("Error: No command provided. Usage: python script.py <command>")
        return
    command = sys.argv[1]
    args = sys.argv[2:]
    
    if command == "rep_subject_credentials":
        rep_subject_credentials(*args)
    elif command == "rep_suspend_subject":
        rep_suspend_subject(*args)
    elif command == "rep_activate_subject":
        rep_activate_subject(*args)
    elif command == "rep_add_subject":
        rep_add_subject(*args)
    elif command == "rep_decrypt_file":
        rep_decrypt_file(*args)
    elif command == "rep_create_org":
        rep_create_org(*args)
    elif command == "rep_list_orgs":
        rep_list_orgs()
    elif command == "rep_create_session":
        rep_create_session(*args)
    elif command == "rep_get_file":
        rep_get_file(*args)
    elif command == "rep_list_subjects":
        rep_list_subjects(*args)
    elif command == "rep_list_docs":
        rep_list_docs(*args)
    elif command == "rep_add_doc":
        rep_add_doc(*args)
    elif command == "rep_get_doc_metadata":
        rep_get_doc_metadata(*args)
    elif command == "rep_get_doc_file":
        rep_get_doc_file(*args)

if __name__ == "__main__":
    main()
