export enum Permission {
  // Permisos relacionados con Documentos
  DOC_NEW = 'DOC_NEW', // Subir un documento nuevo al repositorio
  DOC_READ = 'DOC_READ', // Descargar la metadata o contenido de un documento
  DOC_DELETE = 'DOC_DELETE', // Eliminar un documento
  DOC_ACL = 'DOC_ACL', // Gestionar la ACL del documento

  // Permisos relacionados con Roles
  ROLE_NEW = 'ROLE_NEW', // Crear un nuevo rol
  ROLE_DOWN = 'ROLE_DOWN', // Suspender un rol
  ROLE_UP = 'ROLE_UP', // Reactivar un rol
  ROLE_MOD = 'ROLE_MOD', // Modificar roles (sujetos o permisos)

  // Permisos relacionados con Sujetos
  SUBJECT_NEW = 'SUBJECT_NEW', // Añadir un nuevo sujeto
  SUBJECT_DOWN = 'SUBJECT_DOWN', // Suspender un sujeto
  SUBJECT_UP = 'SUBJECT_UP', // Reactivar un sujeto
  SUBJECT_MOD = 'SUBJECT_MOD', // Modificar roles de un sujeto

  // Otros permisos generales
  ORGANIZATION_CREATE = 'ORGANIZATION_CREATE', // Crear una organización
}

export function getAllPermissionsInStringArray(): string[] {
  return Object.values(Permission);
}
