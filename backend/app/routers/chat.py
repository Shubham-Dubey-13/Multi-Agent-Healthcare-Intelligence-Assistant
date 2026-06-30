from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
from app.services.chat_service import chat_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    context_type: str = "general"

class ChatResponse(BaseModel):
    response: str
    agent_used: str
    sources: List[str] = []

@router.post("/message", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    # Process message via chat service
    result = await chat_service.process_message(
        message=request.message,
        user_id="mock_user_id",
        context_type=request.context_type
    )
    
    return ChatResponse(
        response=result["response"],
        agent_used=result["agent_used"],
        sources=result.get("sources", [])
    )

@router.get("/history/{conversation_id}")
async def get_chat_history(conversation_id: str):
    # Mock history
    return [
        {"role": "ai", "content": "Hello! I am your MediAssist AI. How can I help you today?", "timestamp": "2026-06-07T10:00:00Z"}
    ]
