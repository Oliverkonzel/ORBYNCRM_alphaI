from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import database, models, schemas, crud
from .database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # allow ALL origins
    allow_credentials=True,
    allow_methods=["*"],      # allow ALL methods
    allow_headers=["*"],      # allow ALL headers
)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.get("/")
def root():
    return {"message": "CRM backend running!"}

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pw = pwd_context.hash(user.password)
    return crud.create_user(db, user, hashed_pw)

@app.post("/customers/", response_model=schemas.CustomerOut)
def add_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db, customer)

@app.get("/customers/", response_model=list[schemas.CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return crud.get_customers(db)
