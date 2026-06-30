import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import engine, Base

from app.routers import auth, chat, health, documents, reports, rag

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Multi-Agent Healthcare Intelligence Assistant API"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

@app.on_event("startup")
async def startup_event():
    # Initialize database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "version": settings.VERSION, "app": settings.APP_NAME}

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(health.router, prefix="/api/v1/health", tags=["health"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["reports"])
app.include_router(rag.router, prefix="/api/v1/rag", tags=["rag"])
