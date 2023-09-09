
from os import getenv
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy_utils import create_database, database_exists
from alembic.config import Config
from alembic import command
import uvicorn

# Get parameters from env file
load_dotenv()
DB_DIALECT = getenv('DB_DIALECT')
DB_DRIVER = getenv('DB_DRIVER')
DB_USERNAME = getenv('DB_USERNAME')
DB_PASSWORD = getenv('DB_PASSWORD')
DB_HOST = getenv('DB_HOST')
DB_PORT = getenv('DB_PORT')
DB_DATABASE = getenv('DB_DATABASE')

connectionString = DB_DIALECT+'+'+DB_DRIVER+'://'+DB_USERNAME+':'+DB_PASSWORD+'@'+DB_HOST+':'+DB_PORT+'/'+DB_DATABASE

# Create the engine
engine = create_engine(connectionString)

# Check if the database exists, and if not, create it
if not database_exists(engine.url):
    create_database(engine.url)

# Alembic configurations
alembic_cfg = Config()
alembic_cfg.set_main_option("script_location", r"app/alembic")

# Apply all pending migrations
command.upgrade(alembic_cfg, "head")

# Uvicorn run main
if __name__ == "__main__":
    uvicorn.run("app.main:app", host = "127.0.0.1", port = 8000, reload = True)
