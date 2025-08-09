import os
import json
import logging

# Configuración básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ruta del archivo de estado
STATE_DIR = os.path.dirname(__file__)  # Ruta del directorio actual, es decir, `src`
STATE_FILE = os.path.join(STATE_DIR, 'state.json')

def load_state():
    """Carga el estado desde el archivo state.json o devuelve un estado vacío."""
    state = {}
    if os.path.exists(STATE_FILE):
        logger.info('Cargando estado desde state.json')
        with open(STATE_FILE, 'r') as f:
            state = json.load(f)
    else:
        logger.info('No se encontró state.json. Creando estado vacío.')
    return state

def parse_env(state):
    """Actualiza el estado con variables de entorno, si están definidas."""
    if 'REP_ADDRESS' in os.environ:
        state['REP_ADDRESS'] = os.getenv('REP_ADDRESS')
        logger.info(f"Dirección del repositorio configurada desde el entorno: {state['REP_ADDRESS']}")

    if 'REP_PUB_KEY' in os.environ:
        rep_pub_key_path = os.getenv('REP_PUB_KEY')
        if os.path.exists(rep_pub_key_path):
            with open(rep_pub_key_path, 'r') as f:
                state['REP_PUB_KEY'] = f.read()
                logger.info('Clave pública cargada desde el entorno')
        else:
            logger.warning(f"No se encontró el archivo de clave pública en la ruta: {rep_pub_key_path}")
    
    return state

def save_state(state):
    """Guarda el estado en state.json."""
    if not os.path.exists(STATE_DIR):
        os.makedirs(STATE_DIR)
        logger.info(f"Directorio de estado creado: {STATE_DIR}")

    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=4)
        logger.info(f"Estado guardado en {STATE_FILE}")



def update_state(key, value):
    state = load_state()
    
    state[key] = value
    
    save_state(state)