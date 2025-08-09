import os
from state_management import load_state, parse_env, save_state

# Este es el nombre del archivo de estado
STATE_FILE = os.path.join(os.path.expanduser('~'), '.sio', 'state.json')

def test_state_management():
    # Verifica si el archivo de estado ya existe (puede borrarse al inicio)
    if os.path.exists(STATE_FILE):
        os.remove(STATE_FILE)

    # Cargar el estado (debe ser un dict vacío inicialmente)
    state = load_state()
    print("Estado cargado:", state)

    # Establece variables de entorno para pruebas
    os.environ['REP_ADDRESS'] = "localhost:5000"

    # Actualiza la ruta de la clave pública según el archivo que tienes en tu sistema
    # Asegúrate de usar la ruta correcta del archivo de clave pública
    os.environ['REP_PUB_KEY'] = r"C:\Users\emili\OneDrive\Escritorio\sio-2425-project-123599_123480_123549_123501\src\public_key.txt"

    # Verifica que las variables de entorno se cargan correctamente
    state = parse_env(state)
    print("Estado después de cargar variables de entorno:", state)

    # Guarda el estado en el archivo JSON
    save_state(state)

    # Carga el estado de nuevo para asegurarse de que se guarda correctamente
    loaded_state = load_state()
    print("Estado después de guardarlo y recargarlo:", loaded_state)

    # Verifica que el estado guardado es el mismo
    assert state == loaded_state, "El estado no se ha guardado correctamente!"

    print("Prueba de estado completada con éxito!")

# Ejecuta la prueba
test_state_management()
