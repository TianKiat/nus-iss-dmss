import os

from dotenv import load_dotenv
from pathlib import Path

environment_variable_path = Path('secrets.env')
load_dotenv(dotenv_path = environment_variable_path)

db_host = str(os.getenv('DB_HOST'))
db_user = str(os.getenv('DB_USER'))
db_password = str(os.getenv('PASSWORD'))
db_name = str(os.getenv("DB_NAME"))