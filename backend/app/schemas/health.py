"""Health-related Pydantic request / response schemas."""

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


# ── Symptom Analysis ─────────────────────────────────────────────────────

class SymptomAnalysisRequest(BaseModel):
    """Request body for symptom analysis."""

    symptoms: List[str] = Field(..., min_length=1, description="List of reported symptoms")
    duration: str = Field(..., description="How long symptoms have lasted, e.g. '3 days'")
    severity: str = Field(
        ..., description="Severity level: mild, moderate, or severe"
    )
    additional_info: str = Field(
        default="", description="Any extra context (allergies, medications, etc.)"
    )


class SymptomAnalysisResponse(BaseModel):
    """Structured result of a symptom analysis."""

    possible_conditions: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="List of possible conditions with probability and description",
    )
    risk_level: str = Field(..., description="Overall risk level: low, moderate, high, critical")
    recommended_specialists: List[str] = Field(default_factory=list)
    explanation: str = Field(..., description="Plain-language explanation")
    disclaimer: str = Field(
        default=(
            "This analysis is for informational purposes only and does NOT "
            "constitute medical advice. Always consult a qualified healthcare "
            "professional for diagnosis and treatment."
        )
    )


# ── Report Analysis ──────────────────────────────────────────────────────

class ReportAnalysisResponse(BaseModel):
    """Result of analysing an uploaded lab / medical report."""

    parameters: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="Parsed lab parameters with value, unit, reference range, and status",
    )
    summary: str = Field(default="", description="Overall summary of the report")
    explanations: List[str] = Field(
        default_factory=list, description="Plain-language explanations per parameter"
    )
    recommendations: List[str] = Field(default_factory=list)


# ── Risk Prediction ─────────────────────────────────────────────────────

class RiskPredictionRequest(BaseModel):
    """Patient features for disease-risk prediction."""

    age: int = Field(..., ge=1, le=120)
    gender: str = Field(..., description="male or female")
    bmi: float = Field(..., ge=10.0, le=60.0)
    blood_pressure_systolic: int = Field(..., ge=60, le=250)
    blood_pressure_diastolic: int = Field(..., ge=40, le=150)
    cholesterol_total: float = Field(default=200.0, description="mg/dL")
    cholesterol_hdl: float = Field(default=50.0, description="mg/dL")
    cholesterol_ldl: float = Field(default=130.0, description="mg/dL")
    smoking: bool = False
    diabetes_family_history: bool = False
    exercise_frequency: str = Field(
        default="moderate", description="none, light, moderate, active"
    )
    fasting_blood_sugar: float = Field(default=90.0, description="mg/dL")
    hba1c: float = Field(default=5.5, description="% glycated haemoglobin")


class RiskPredictionResponse(BaseModel):
    """Predicted risk scores for multiple diseases."""

    risks: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="List of {disease, probability, level, factors}",
    )
    overall_assessment: str = ""
    recommendations: List[str] = Field(default_factory=list)


# ── Health Summary ───────────────────────────────────────────────────────

class HealthSummaryResponse(BaseModel):
    """Aggregated health summary for a patient."""

    summary: str = ""
    trends: List[Dict[str, Any]] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    generated_at: datetime = Field(default_factory=datetime.utcnow)


# ── Chat ─────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    """A single chat message."""

    role: str = Field(..., description="user or assistant")
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    """User chat input."""

    message: str = Field(..., min_length=1)
    conversation_id: Optional[str] = None
    context_type: Optional[str] = Field(
        default=None,
        description="Optional hint: symptom_analysis, report_explanation, risk_prediction, general",
    )


class ChatResponse(BaseModel):
    """Assistant chat response."""

    response: str
    agent_used: str = "general"
    sources: List[str] = Field(default_factory=list)
    suggestions: List[str] = Field(default_factory=list)
    conversation_id: str = ""


# ── RAG ──────────────────────────────────────────────────────────────────

class RAGQueryRequest(BaseModel):
    """Query for Retrieval-Augmented Generation."""

    query: str = Field(..., min_length=1)
    top_k: int = Field(default=5, ge=1, le=20)


class RAGQueryResponse(BaseModel):
    """RAG answer with sources."""

    answer: str
    sources: List[Dict[str, Any]] = Field(default_factory=list)
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)


# ── Health Metrics ───────────────────────────────────────────────────────

class HealthMetricCreate(BaseModel):
    """Add a new health metric reading."""

    metric_type: str = Field(..., description="e.g. blood_pressure, blood_sugar, weight, heart_rate")
    value: float
    unit: str
    recorded_at: Optional[datetime] = None


class HealthMetricResponse(BaseModel):
    """Single health metric record."""

    id: str
    metric_type: str
    value: float
    unit: str
    recorded_at: datetime

    class Config:
        from_attributes = True


# ── Documents ────────────────────────────────────────────────────────────

class DocumentResponse(BaseModel):
    """Uploaded document metadata."""

    id: str
    filename: str
    original_filename: str
    file_type: str
    uploaded_at: datetime
    has_extracted_text: bool = False
    has_analysis: bool = False

    class Config:
        from_attributes = True


class DocumentDetailResponse(BaseModel):
    """Document with full extracted text and analysis."""

    id: str
    filename: str
    original_filename: str
    file_type: str
    extracted_text: Optional[str] = None
    analysis_result: Optional[Dict[str, Any]] = None
    uploaded_at: datetime

    class Config:
        from_attributes = True


# ── Patient History ──────────────────────────────────────────────────────

class PatientHistoryResponse(BaseModel):
    """Single patient history entry."""

    id: str
    record_type: str
    title: str
    summary: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True
