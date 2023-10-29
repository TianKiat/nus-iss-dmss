
from os import getenv
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy_utils import create_database, database_exists
from alembic.config import Config
from alembic import command

import uvicorn

# Get parameters from env file
load_dotenv()
FASTAPI_URL = getenv('FASTAPI_URL')
FASTAPI_URL_PORT = int(getenv('FASTAPI_URL_PORT'))

connectionString = getenv('DB_CONNECTION_STRING')

# Create the engine
engine = create_engine(connectionString)

# Create the db session factory
SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the scoped session
SessionLocal = scoped_session(SessionFactory)

# Check if the database exists, and if not, create it
if not database_exists(engine.url):
    create_database(engine.url)

# Alembic configurations
alembic_cfg = Config()
alembic_cfg.set_main_option("script_location", "app/alembic")

# Apply all pending migrations
command.upgrade(alembic_cfg, "head")

# Uvicorn run main
if __name__ == "__main__":
    uvicorn.run("app.main:app", host = FASTAPI_URL, port = FASTAPI_URL_PORT, reload = True)
