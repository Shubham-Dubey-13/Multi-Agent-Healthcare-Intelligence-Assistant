"""Async SQLAlchemy database setup for SQLite.

Provides the async engine, session factory, declarative Base, and FastAPI
dependency ``get_db`` for request-scoped sessions.
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
    connect_args={"check_same_thread": False},  # required for SQLite
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""
    pass


async def get_db() -> AsyncSession:  # type: ignore[misc]
    """FastAPI dependency that yields a database session per request."""
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """Create all tables defined by ORM models.

    Call this once during application startup.
    """
    async with engine.begin() as conn:
        from app.models import patient, user  # noqa: F401  — ensure models are loaded
        await conn.run_sync(Base.metadata.create_all)
