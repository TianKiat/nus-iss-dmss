from dotenv import load_dotenv
from os import getenv

load_dotenv()

DB_DIALECT = getenv('DB_DIALECT')
DB_DRIVER = getenv('DB_DRIVER')
DB_USERNAME = getenv('DB_USERNAME')
DB_PASSWORD = getenv('DB_PASSWORD')
DB_HOST = getenv('DB_HOST')
DB_PORT = getenv('DB_PORT')
DB_DATABASE = getenv('DB_DATABASE')