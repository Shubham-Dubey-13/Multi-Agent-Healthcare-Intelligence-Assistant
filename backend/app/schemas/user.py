"""User-related Pydantic request / response schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ── Requests ─────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    """Schema for user registration."""

    email: str = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password (min 6 chars)")
    full_name: str = Field(..., min_length=1, description="Full legal name")


class UserLogin(BaseModel):
    """Schema for user login."""

    email: str = Field(..., description="Registered email")
    password: str = Field(..., description="Account password")


class UserProfileUpdate(BaseModel):
    """Schema for profile updates (all fields optional)."""

    full_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    phone: Optional[str] = None


# ── Responses ────────────────────────────────────────────────────────────

class UserResponse(BaseModel):
    """Public-safe user representation."""

    id: str
    email: str
    full_name: str
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class UserProfile(BaseModel):
    """Extended user profile with metadata."""

    id: str
    email: str
    full_name: str
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """JWT token response returned after successful login/register."""

    access_token: str
    token_type: str = "bearer"
    user: UserResponse
