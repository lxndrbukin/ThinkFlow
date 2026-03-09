from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from os import getenv
from db import get_db
from db_models.auth import User
from models.auth import UserAuth, TokenResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

pwd_context = CryptContext(schemes=["bcrypt"])

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def register(data: UserAuth, db: Session) -> TokenResponse:
    try:
        user = User(
            username=data.username,
            hash_password = pwd_context.hash(data.password)
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        jwt_token = create_token(user.id)
        return TokenResponse(access_token=jwt_token)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")

def login(data: UserAuth, db: Session) -> TokenResponse:
    user = db.query(User).filter(User.username == data.username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    is_valid = pwd_context.verify(data.password, user.hash_password)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    jwt_token = create_token(user.id)
    return TokenResponse(access_token=jwt_token)