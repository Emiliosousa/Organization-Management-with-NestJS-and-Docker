from flask import Flask, render_template, request, jsonify, send_file, url_for, redirect
import json
import os
import uuid
from state_management import load_state, parse_env, save_state


# Cargar el estado inicial
state = load_state()
state = parse_env(state)

# Dirección del repositorio
repo_address = state.get("REP_ADDRESS", "localhost:5000")

# Al finalizar la ejecución del programa, guarda el estado actualizado
save_state(state)

app = Flask(__name__)

DATA_DIR = './delivery1/src/data'
ORG_DIR = os.path.abspath(os.path.join(os.getcwd(), 'delivery1', 'src', 'data', 'organizations'))
SESSION_DIR = os.path.abspath(os.path.join(os.getcwd(), 'delivery1', 'src', 'data', 'sessions'))
DOC_DIR = os.path.abspath(os.path.join(os.getcwd(), 'delivery1', 'src', 'data', 'documents'))

# Crear la carpeta de documentos si no existe
if not os.path.exists(DOC_DIR):
    os.makedirs(DOC_DIR)
    print("La carpeta 'data/documents' ha sido creada.")


# Endpoint para crear una organización
@app.route("/organization/create", methods=["POST"])
def create_org():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Validar datos recibidos
    required_fields = ["organization", "username", "name", "email", "public_key"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo {field}"}), 400

    org_id = uuid.uuid4().hex  # Generar ID único para la organización
    org_data = {
        "organization": data["organization"],
        "username": data["username"],
        "name": data["name"],
        "email": data["email"],
        "public_key": data["public_key"]
    }

    # Guardar organización en archivo JSON
    os.makedirs(ORG_DIR, exist_ok=True)
    with open(os.path.join(ORG_DIR, f"{org_id}.json"), "w") as f:
        json.dump(org_data, f)

    return jsonify({"status": "success", "organization_id": org_id}), 201


# Endpoint para listar organizaciones
@app.route("/organization/list", methods=["GET"])
def list_orgs():
    """
    Vista para listar todas las organizaciones almacenadas.
    """
    orgs = []
    try:
        for file_name in os.listdir(ORG_DIR):
            with open(os.path.join(ORG_DIR, file_name), "r") as f:
                orgs.append(json.load(f))
    except FileNotFoundError:
        return jsonify({"error": "No organizations found"}), 404

    return jsonify(orgs), 200


# Endpoint para subir archivos
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(url_for('home'))

    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('home'))

    file.save(os.path.join(DOC_DIR, file.filename))
    return redirect(url_for('home'))


# Endpoint para crear sesión
@app.route("/session/create", methods=["POST"])
def create_session():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Validar datos recibidos
    if "organization" not in data or "username" not in data:
        return jsonify({"error": "Falta el campo organization o username"}), 400

    session_id = uuid.uuid4().hex  # Generar ID único para la sesión
    session_data = {
        "organization": data["organization"],
        "username": data["username"],
        "session_id": session_id
    }

    # Guardar sesión en archivo JSON
    os.makedirs(SESSION_DIR, exist_ok=True)
    with open(os.path.join(SESSION_DIR, f"{session_id}.json"), "w") as f:
        json.dump(session_data, f)

    return jsonify({"status": "success", "session_id": session_id}), 201


# Endpoint para descargar archivo
@app.route("/file/download/<file_handle>", methods=["GET"])
def download_file(file_handle):
    file_path = os.path.join(DOC_DIR, file_handle)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return {"error": "File not found"}, 404


# Endpoint para visualizar el archivo
@app.route('/file/view/<file_handle>', methods=['GET'])
def view_file(file_handle):
    file_path = os.path.join(DOC_DIR, file_handle)
    if os.path.exists(file_path):
        return send_file(file_path)
    return jsonify({"error": "Archivo no encontrado"}), 404


# Página de inicio
@app.route("/")
def home():
    # Listar archivos en la carpeta de documentos
    files = os.listdir(DOC_DIR) if os.path.exists(DOC_DIR) else []
    return render_template('index.html', files=files)


if __name__ == "__main__":
    os.makedirs(DOC_DIR, exist_ok=True)
    app.run(debug=True)
