from fastapi import APIRouter, status, Depends
from models.auth import UserAuth, UserResponse
from db_models.auth import User
from db import get_db
from crud.auth import get_current_user
from sqlalchemy.orm import Session
from crud.auth import (
    register as register_crud,
    login as login_crud
)

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UserAuth, db: Session = Depends(get_db)):
    return register_crud(data, db)

@auth_router.post("/login", status_code=status.HTTP_200_OK)
def login(data: UserAuth, db: Session = Depends(get_db)):
    return login_crud(data, db)

@auth_router.get("/me", status_code=status.HTTP_200_OK)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(id=current_user.id, username=current_user.username, created_at=current_user.created_at)