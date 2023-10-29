# nus-iss-dmss
NUS ISS Designing Modern Software Solutions Practice Module



# To build frontend app without docker

1. Install NodeJS version v18.16.0+ from this [link](https://nodejs.org/en/download).
2. Install pnpm for NodeJS, you can follow this [guide](https://pnpm.io/installation#using-npm).
3. Go to the frontend app folder 
    ```
    cd frontend
    ```
4. Run 
    ```
    pnpm install
    ```

# To run the frontend app without docker
1. Go to the frontend app folder 
    ```
    cd frontend
    ```
2. Run ```pnpm run dev``` to start the app. You will see this in your terminal:
    ```
    VITE v4.4.5  ready in 447 ms
    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h to show help 
    ```
3. Go to the link provided.

# To setup backend app
1. Run
   ```
   pip install virtualenv
   ```
2. Go to the backend folder
   ```
   cd backend
   ```
Note: If already have existing virtual environment, can remove the virtualenv using this command
```
rm -r <your environment name>
```
3. Create virtualenv
   ```
   virtualenv <your environment name>
   ```
4. Activate virtualenv that is created
   ```
   <your environment name>\Scripts\activate
   ```
5. Run the pip install command to install the libraries
   ```
   pip install -r requirements.txt
   ```
6. Deactivate virtualenv
   ```
   deactivate
   ```
   
# To run backend app
1. Go to the backend folder
   ```
   cd backend
   ```
2. Activate virtualenv that is created
   ```
   <your environment name>\Scripts\activate
   ```
3. Create .env to store connection string and paste this in .env
   ```
   DB_CONNECTION_STRING=mysql+mysqlconnector://root:your_password@localhost:3306/food_ordering
   FASTAPI_URL=127.0.0.1
   FASTAPI_URL_PORT=8000
   OTP_EMAIL=foodorderingnus@gmail.com
   OTP_EMAIL_PASSWORD=yasw xhdg fjwl lvty
   ```
4. Start fastapi and run migration scripts
   ```
   python run.py
   ```
5. Stop fastapi
   ```
   ctrl + c
   ```
6. Go to the backend folder
   ```
   cd ..
   ```
7. Deactivate virtualenv
   ```
   deactivate
   ```
