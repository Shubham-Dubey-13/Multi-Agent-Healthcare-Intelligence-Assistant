"""Application configuration using pydantic-settings.

Loads settings from environment variables and .env file with sensible defaults
for local development with SQLite.
"""

from typing import List, Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # ── Application ──────────────────────────────────────────────────────
    APP_NAME: str = "Multi-Agent Healthcare Intelligence Assistant"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    # ── Database ─────────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite+aiosqlite:///./healthcare.db"

    # ── Security / JWT ───────────────────────────────────────────────────
    SECRET_KEY: str = "super-secret-dev-key-change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # ── Google Gemini ────────────────────────────────────────────────────
    GEMINI_API_KEY: Optional[str] = None

    # ── ChromaDB / RAG ───────────────────────────────────────────────────
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_db"

    # ── File uploads ─────────────────────────────────────────────────────
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_SIZE_MB: int = 20

    # ── ML models ────────────────────────────────────────────────────────
    ML_MODELS_DIR: str = "./ml_models"

    # ── CORS ─────────────────────────────────────────────────────────────
    CORS_ORIGINS: List[str] = ["*"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
