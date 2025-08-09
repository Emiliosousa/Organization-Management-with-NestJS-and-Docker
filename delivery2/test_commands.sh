#!/usr/bin/env bash
set -euo pipefail

echo "Running tests for delivery2 commands using scripts"
echo "Step 1:  Creating public and privated keys"
sh ./rep_subject_credentials.sh hola

echo "Public and private keys generated"

echo "Step 2: Generating auxiliar organization"

sh ./rep_create_org.sh Probando hola hola hola hola@outlook.com ../local/pub.key
echo "Organization created successfully"

# Paso 3: Crear una sesión
echo "Step 3: Creating a session"
sh ./rep_create_session.sh hola hola

echo "Session created and token saved in ../scripts/anonymus/.session"


# Paso 6: Listar roles
echo "Step 4: Listing roles"
sh ../scripts/authenticated/rep_list_roles.sh ../scripts/anonymus/.session
echo "Roles listed successfully"


echo "Step 5: Adding role"
sh ./rep_add_role.sh ../anonymus/.session LECTOR "[DOC_NEW, DOC_READ]"
echo "Role added successfully"

echo "Step 6: Listing subjects"
sh ./rep_list_subjects.sh ../anonymus/.session 
echo "Subjects listed successfully"

# Paso 6: Agregar un documento
echo "Step 6: Adding a document"
echo "This is a test document" > testfile.txt
sh ./rep_add_doc.sh ../anonymus/.session prueba ../../delivery2/testfile.txt aes-256-cbc ../local/pub.key
echo "Document 'TestDocument' added successfully"
# Paso 7: Asignar un rol a un sujeto
echo "Step 7: Assigning a role to a subject"
sh ./rep_assign_role_to_subject.sh ../scripts/anonymus/.session LECTOR hola
echo "Role 'AdminRole' assigned to subject 'hola'"


# Paso 8: Listar documentos
echo "Step 8: Listing documents"
sh ./rep_list_docs.sh ../anonymus/.session
echo "Documents listed successfully."



# Paso 9: Descargar un documento
echo "Step 9: Downloading a document"
sh ./rep_get_file.sh 1 prueba_downloaded.enc
echo "Document downloaded successfully to 'prueba_downloaded.enc'"

echo "Step 10: Suspending a subject"
sh ./rep_suspend_role.sh ../anonymus/.session LECTOR
echo "Subject 'hola' suspended successfully"

echo "Step 11: Reactivating the subject"
sh ./rep_reactivate_role.sh ../anonymus/.session LECTOR
echo "Subject 'hola' reactivated successfully"





echo "Step 12: Listing permissions for a role"
sh ./rep_list_role_permissions.sh ../anonymus/.session LECTOR
echo "Permissions for role 'lector' listed successfully"

echo "Step 13: Listing subjects for a role"
sh ./rep_list_role_subjects.sh ../anonymus/.session OWNER
echo "Subjects for role 'OWNER' listed successfully"

echo "Step 14: Removing a role from a subject"
sh ./rep_remove_role_to_subject.sh ../scripts/anonymus/.session LECTOR hola
echo "Role 'lector' removed from subject 'hola' successfully"

echo "Step 15: Removing permissions from a role"
sh ./rep_remove_permission.sh ../anonymus/.session lector DOC_ACL
echo "Permission 'DOC_ACL' removed from role 'lector' successfully"

echo "Step 16: Assigning permissions to a role"
sh ./rep_add_permission.sh ../anonymus/.session lector DOC_ACL
echo "Permission 'DOC_ACL' assigned to role 'lector' successfully"
echo "Step 17: Listing all subject's roles"
sh ./rep_list_subject_roles.sh ../anonymus/.session "hola"
echo "Roles listed successfully"
echo "Step 18: List role permissions"
sh ./rep_list_role_permissions.sh ../anonymus/.session owner
echo "Step 19: Listing permission roles"
sh ./rep_list_permission_roles.sh ../anonymus/.session SUBJECT_UP
echo "Roles listed successfully"
echo "Step 20: Dropping role"
sh ./rep_drop_role.sh ../anonymus/.session
echo "Role dropped successfully"