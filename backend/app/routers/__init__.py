from fastapi import APIRouter
from . import auth, chat, health, documents, reports, rag

# This file just makes the routers directory a package.
