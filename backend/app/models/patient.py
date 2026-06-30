"""Patient-related ORM models: history, metrics, and documents."""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, Float, ForeignKey, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class RecordType(str, enum.Enum):
    """Types of patient history records."""

    SYMPTOM_CHECK = "symptom_check"
    REPORT_ANALYSIS = "report_analysis"
    RISK_ASSESSMENT = "risk_assessment"
    CONSULTATION = "consultation"


class PatientHistory(Base):
    """A single patient interaction / clinical event."""

    __tablename__ = "patient_history"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: str = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    record_type: str = Column(
        Enum(RecordType), nullable=False, default=RecordType.SYMPTOM_CHECK
    )
    title: str = Column(String, nullable=False)
    summary: str = Column(Text, nullable=True)
    details: str = Column(Text, nullable=True)  # JSON-serialised dict
    created_at: datetime = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="patient_history")

    def __repr__(self) -> str:
        return f"<PatientHistory {self.record_type} {self.title[:30]}>"


class HealthMetric(Base):
    """Time-series health measurement (BP, sugar, weight …)."""

    __tablename__ = "health_metrics"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: str = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    metric_type: str = Column(String, nullable=False, index=True)
    value: float = Column(Float, nullable=False)
    unit: str = Column(String, nullable=False)
    recorded_at: datetime = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="health_metrics")

    def __repr__(self) -> str:
        return f"<HealthMetric {self.metric_type}={self.value}{self.unit}>"


class MedicalDocument(Base):
    """Uploaded medical document (lab report, prescription, imaging)."""

    __tablename__ = "medical_documents"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: str = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    filename: str = Column(String, nullable=False)
    original_filename: str = Column(String, nullable=False)
    file_type: str = Column(String, nullable=False)  # e.g. "image/png", "application/pdf"
    extracted_text: str = Column(Text, nullable=True)
    analysis_result: str = Column(Text, nullable=True)  # JSON-serialised dict
    uploaded_at: datetime = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="medical_documents")

    def __repr__(self) -> str:
        return f"<MedicalDocument {self.original_filename}>"
