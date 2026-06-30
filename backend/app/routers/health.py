from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class SymptomAnalysisRequest(BaseModel):
    symptoms: List[str]
    duration: str
    severity: str
    additional_info: str = ""

@router.post("/analyze-symptoms")
async def analyze_symptoms(request: SymptomAnalysisRequest):
    return {
        "possible_conditions": [
            {"name": "Migraine", "probability": 0.8},
            {"name": "Tension Headache", "probability": 0.6}
        ],
        "risk_level": "moderate",
        "recommended_specialists": ["Neurologist", "General Physician"],
        "explanation": "Based on the mock analysis, your symptoms suggest a possible migraine.",
        "disclaimer": "This is an AI-generated analysis and not medical advice."
    }

class RiskPredictionRequest(BaseModel):
    age: int
    gender: str
    bmi: float
    blood_pressure: str
    cholesterol: str
    smoking: str
    diabetes_family_history: str
    exercise_frequency: str

@router.post("/predict-risk")
async def predict_risk(request: RiskPredictionRequest):
    return {
        "risks": [
            {
                "disease": "Type 2 Diabetes",
                "probability": 0.35,
                "level": "moderate",
                "factors": ["BMI", "Family History"]
            },
            {
                "disease": "Cardiovascular Disease",
                "probability": 0.15,
                "level": "low",
                "factors": ["Blood Pressure"]
            }
        ]
    }
