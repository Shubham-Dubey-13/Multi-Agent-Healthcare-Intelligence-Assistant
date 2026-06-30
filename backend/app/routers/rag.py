from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class RAGQueryRequest(BaseModel):
    query: str
    top_k: int = 5

@router.post("/query")
async def query_rag(request: RAGQueryRequest):
    return {
        "answer": "This is a mock answer based on retrieved medical literature. Always consult a doctor.",
        "sources": ["PubMed ID: 123456", "Clinical Guidelines 2024"],
        "confidence": 0.92
    }
