from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from datetime import timedelta
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    # Mock registration
    return {"access_token": "mock_token_for_" + user.email, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    # Mock login
    return {"access_token": "mock_token_for_" + user.email, "token_type": "bearer"}

@router.get("/me")
async def get_current_user():
    return {
        "id": "mock-uuid-1234",
        "email": "user@example.com",
        "full_name": "Test User",
        "date_of_birth": "1990-01-01",
        "gender": "Other",
        "blood_group": "O+"
    }
