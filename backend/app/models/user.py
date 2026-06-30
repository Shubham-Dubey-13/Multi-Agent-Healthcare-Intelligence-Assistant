"""User ORM model."""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    """Application user / patient account."""

    __tablename__ = "users"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email: str = Column(String, unique=True, nullable=False, index=True)
    password_hash: str = Column(String, nullable=False)
    full_name: str = Column(String, nullable=False)
    date_of_birth: str = Column(String, nullable=True)  # ISO date string
    gender: str = Column(String, nullable=True)
    blood_group: str = Column(String, nullable=True)
    phone: str = Column(String, nullable=True)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # ── relationships ────────────────────────────────────────────────────
    patient_history = relationship(
        "PatientHistory", back_populates="user", cascade="all, delete-orphan"
    )
    health_metrics = relationship(
        "HealthMetric", back_populates="user", cascade="all, delete-orphan"
    )
    medical_documents = relationship(
        "MedicalDocument", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<User {self.email}>"
