from sqlalchemy.orm import Session
from . import models, schemas

def create_user(db: Session, user: schemas.UserCreate, password_hash: str):
    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password_hash=password_hash,
        role=user.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone,
        company_name=customer.company_name,
        address=customer.address,
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def get_customers(db: Session):
    return db.query(models.Customer).all()
