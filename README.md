# 🏥 Multi-Agent Healthcare Intelligence Assistant

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![LangGraph](https://img.shields.io/badge/LangGraph-Agents-FF6B35?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A production-grade, multi-agent AI system for intelligent healthcare assistance**

*Combining Agentic AI • Generative AI • Machine Learning • NLP • OCR • RAG • Vector Databases • Voice AI • Full Stack Development*

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Tech Stack](#-technology-stack) • [API Docs](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Multi-Agent Design](#-multi-agent-design)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [AI/ML Pipelines](#-aiml-pipelines)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security & Privacy](#-security--privacy)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Monitoring](#-monitoring)
- [Research Scope](#-research-scope)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The **Multi-Agent Healthcare Intelligence Assistant** is a comprehensive AI-powered platform that leverages multiple specialized AI agents to provide intelligent healthcare assistance. Unlike traditional chatbots, this system employs a **supervisor-agent architecture** where each agent specializes in a specific medical domain, delivering expert-level analysis across symptoms, reports, risk prediction, and medical literature.

### Problem Statement

Patients face significant challenges in:
- Understanding complex medical reports and lab results
- Tracking health trends across multiple parameters over time
- Getting timely specialist recommendations based on symptoms
- Accessing medical literature in understandable language
- Maintaining comprehensive health records

Healthcare providers are simultaneously overburdened with routine queries that could be handled by intelligent systems. This project bridges that gap with a multi-agent AI system that provides personalized, evidence-based healthcare intelligence.

### Real-World Use Cases

| Use Case | Description | Agents Involved |
|---|---|---|
| 🔍 **Symptom Analysis** | Describe symptoms → Get possible conditions + specialist recommendations | SymptomAnalyzer, SpecialistRecommender |
| 📊 **Report Explanation** | Upload lab report → Get plain-language explanations of every parameter | OCR, ReportExplainer |
| 💊 **Prescription Reading** | Upload prescription image → Extract medications, dosages, instructions | OCR, NER Pipeline |
| 📚 **Medical Q&A** | Ask medical questions → Get evidence-based answers from medical literature | RAG Agent |
| ⚠️ **Risk Prediction** | Input health parameters → ML-predicted disease risks | RiskPredictor |
| 📝 **Health Summaries** | Generate comprehensive health reports with trends | SummaryGenerator |
| 🎙️ **Voice Consultation** | Hands-free voice interaction for accessibility | VoiceAgent |
| 👨‍⚕️ **Specialist Finder** | Based on symptoms/diagnosis → Appropriate specialist recommendation | SpecialistRecommender |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│  │ Dashboard │ │ AI Chat + │ │ Document  │ │ Reports & │       │
│  │           │ │ Voice     │ │ Upload    │ │ History   │       │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘       │
└────────────────────────┬────────────────────────────────────────┘
                         │ REST API + WebSocket
┌────────────────────────┴────────────────────────────────────────┐
│                    API GATEWAY (FastAPI)                         │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────────┐          │
│  │ Auth/JWT │ │ Rate     │ │ File      │ │ WebSocket│          │
│  │          │ │ Limiting │ │ Upload    │ │ Handler  │          │
│  └──────────┘ └──────────┘ └───────────┘ └──────────┘          │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────────┐
│              AGENT ORCHESTRATOR (LangGraph)                      │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  Supervisor Agent → Intent Classification → Routing    │      │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │      │
│  │  │ Symptom  │ │ Report   │ │ OCR      │ │ RAG      │ │      │
│  │  │ Analyzer │ │ Explainer│ │ Agent    │ │ Agent    │ │      │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │      │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │      │
│  │  │ Risk     │ │ Specialist│ │ Summary  │ │ Voice   │ │      │
│  │  │ Predictor│ │ Recommend │ │ Generator│ │ Agent   │ │      │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │      │
│  └────────────────────────────────────────────────────────┘      │
└──────────┬──────────┬──────────┬──────────┬─────────────────────┘
           │          │          │          │
    ┌──────┴───┐ ┌───┴────┐ ┌──┴───┐ ┌───┴────┐
    │PostgreSQL│ │ChromaDB│ │Redis │ │Gemini  │
    │(Patient  │ │(Vector │ │(Cache)│ │API     │
    │ Data)    │ │ Store) │ │      │ │(LLM)   │
    └──────────┘ └────────┘ └──────┘ └────────┘
```

---

## 🤖 Multi-Agent Design

### Agent Hierarchy

```
                    ┌─────────────────┐
                    │  Supervisor     │
                    │  Agent          │
                    │  (Router)       │
                    └───────┬─────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
    ┌───────┴──────┐ ┌─────┴─────┐ ┌──────┴───────┐
    │ Symptom      │ │ Report    │ │ Risk         │
    │ Analyzer     │ │ Explainer │ │ Predictor    │
    └───────┬──────┘ └─────┬─────┘ └──────┬───────┘
            │              │              │
    ┌───────┴──────┐ ┌─────┴─────┐ ┌─────┴──────┐
    │ Specialist   │ │ OCR       │ │ Summary    │
    │ Recommender  │ │ Agent     │ │ Generator  │
    └──────────────┘ └───────────┘ └────────────┘
            
            ┌──────────┐  ┌──────────┐
            │ RAG      │  │ Voice    │
            │ Agent    │  │ Agent    │
            └──────────┘  └──────────┘
```

### LangGraph Workflow

```
START → IntentClassifier → Route Decision
  ├─ "symptom"  → SymptomAnalyzer → SpecialistRecommend → SummaryGenerator → END
  ├─ "report"   → OCRAgent → ReportExplainer → SummaryGenerator → END  
  ├─ "question"  → RAGAgent → END
  ├─ "risk"     → RiskPredictor → SummaryGenerator → END
  ├─ "voice"    → VoiceAgent → (re-route to appropriate agent) → END
  └─ "general"  → GeneralChat → END
```

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18, Vite | UI Framework |
| **Styling** | Vanilla CSS | Custom design system |
| **Charts** | Chart.js, react-chartjs-2 | Health metrics visualization |
| **Icons** | Lucide React | Modern icon library |
| **Backend** | Python 3.11, FastAPI | REST API server |
| **ORM** | SQLAlchemy 2.0 | Database abstraction |
| **AI Orchestration** | LangGraph | Multi-agent workflow |
| **LLM** | Google Gemini API | Text generation |
| **ML** | Scikit-learn | Risk prediction models |
| **NLP** | SpaCy | Named Entity Recognition |
| **OCR** | Tesseract, Pillow | Document text extraction |
| **RAG** | ChromaDB, sentence-transformers | Medical literature retrieval |
| **Voice** | Web Speech API | Browser-native STT/TTS |
| **Database** | SQLite/PostgreSQL | Relational data storage |
| **Vector DB** | ChromaDB | Embedding storage |
| **Auth** | JWT, bcrypt | Authentication |
| **PDF** | ReportLab | Report generation |
| **DevOps** | Docker, Docker Compose | Containerization |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- (Optional) Tesseract OCR
- (Optional) Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/multi-agent-healthcare-assistant.git
cd multi-agent-healthcare-assistant
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Docker (Alternative)

```bash
docker-compose up --build
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📁 Project Structure

```
Multi-Agent Healthcare Intelligence Assistant/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI application entry point
│   │   ├── config.py                  # Application settings
│   │   ├── database.py                # Database connection & setup
│   │   ├── models/                    # SQLAlchemy ORM models
│   │   │   ├── user.py               # User model
│   │   │   └── patient.py            # Patient data models
│   │   ├── schemas/                   # Pydantic request/response schemas
│   │   │   ├── user.py               # Auth schemas
│   │   │   └── health.py             # Health-related schemas
│   │   ├── routers/                   # API route handlers
│   │   │   ├── auth.py               # Authentication endpoints
│   │   │   ├── chat.py               # AI chat endpoints
│   │   │   ├── health.py             # Health analysis endpoints
│   │   │   ├── documents.py          # Document upload/OCR
│   │   │   ├── reports.py            # Report generation
│   │   │   └── rag.py                # RAG query endpoints
│   │   ├── agents/                    # AI Agent implementations
│   │   │   ├── supervisor.py         # Supervisor/Router agent
│   │   │   ├── symptom_analyzer.py   # Symptom analysis agent
│   │   │   ├── report_explainer.py   # Report explanation agent
│   │   │   ├── ocr_agent.py          # OCR processing agent
│   │   │   ├── rag_agent.py          # RAG retrieval agent
│   │   │   ├── risk_predictor.py     # ML risk prediction agent
│   │   │   ├── specialist_recommender.py
│   │   │   └── summary_generator.py  # Summary & PDF generation
│   │   ├── pipelines/                 # Processing pipelines
│   │   │   ├── ocr_pipeline.py       # Image preprocessing & OCR
│   │   │   ├── ner_pipeline.py       # Named Entity Recognition
│   │   │   ├── rag_pipeline.py       # RAG with ChromaDB
│   │   │   ├── ml_pipeline.py        # ML model training & inference
│   │   │   └── report_parser.py      # Lab report parsing
│   │   ├── services/                  # Business logic services
│   │   │   ├── auth_service.py       # Authentication logic
│   │   │   ├── chat_service.py       # Chat orchestration
│   │   │   └── llm_service.py        # LLM API wrapper
│   │   └── utils/                     # Utility modules
│   │       ├── helpers.py            # General helpers
│   │       └── medical_data.py       # Medical reference data
│   ├── data/                          # Medical knowledge base
│   │   ├── medical_knowledge.json    # Knowledge entries
│   │   └── reference_ranges.json     # Lab test ranges
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/               # Sidebar, Header, Layout
│   │   │   ├── common/               # Button, Card, Modal, etc.
│   │   │   ├── charts/               # HealthChart, RiskGauge
│   │   │   └── chat/                 # MessageBubble, VoiceInput
│   │   ├── pages/                     # Dashboard, Chat, Upload, etc.
│   │   ├── services/                  # API client
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── styles/                    # Global CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

---

## 🧠 AI/ML Pipelines

### 1. OCR Pipeline
```
Image Upload → Preprocessing (OpenCV) → Text Extraction (Tesseract) → NER → Structured Data
```

### 2. RAG Pipeline
```
Medical Literature → Embedding (sentence-transformers) → ChromaDB → Query → Retrieve → LLM Generate
```

### 3. Disease Risk Prediction
```
Patient Features → Feature Engineering → RandomForest Classifier → Risk Scores → Recommendations
```
- Models: Diabetes Risk, Cardiac Risk, Hypertension Risk
- Features: Age, BMI, Blood Pressure, Cholesterol, Lifestyle factors
- Training: Synthetic data with clinically-accurate distributions

### 4. NER Pipeline
```
Medical Text → SpaCy + Custom Patterns → Entities (Drugs, Dosages, Conditions, Tests)
```

### 5. Report Analysis Pipeline
```
Lab Report Text → Value Extraction → Reference Range Comparison → Abnormality Detection → Plain-Language Explanation
```

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login and get JWT |
| GET | `/api/v1/auth/me` | Get current user |
| PUT | `/api/v1/auth/profile` | Update profile |

### AI Chat
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/chat/message` | Send message to AI assistant |
| GET | `/api/v1/chat/history/{id}` | Get conversation history |

### Health Analysis
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/health/analyze-symptoms` | Analyze symptoms |
| POST | `/api/v1/health/analyze-report` | Analyze medical report |
| POST | `/api/v1/health/predict-risk` | Predict health risks |
| GET | `/api/v1/health/summary/{user_id}` | Get health summary |
| POST | `/api/v1/health/metrics` | Add health metric |

### Documents
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/documents/upload` | Upload document |
| GET | `/api/v1/documents/{user_id}` | List documents |
| POST | `/api/v1/documents/ocr` | OCR extraction |

### RAG
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/rag/query` | Query medical literature |
| POST | `/api/v1/rag/index` | Index new documents |

---

## 🗄 Database Schema

### Entity Relationship Diagram
```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│    Users     │     │ PatientHistory  │     │  HealthMetrics   │
├──────────────┤     ├─────────────────┤     ├──────────────────┤
│ id (PK)      │──┐  │ id (PK)         │     │ id (PK)          │
│ email        │  ├──│ user_id (FK)    │  ┌──│ user_id (FK)     │
│ password_hash│  │  │ record_type     │  │  │ metric_type      │
│ full_name    │  │  │ title           │  │  │ value            │
│ date_of_birth│  │  │ summary         │  │  │ unit             │
│ gender       │  │  │ details (JSON)  │  │  │ recorded_at      │
│ blood_group  │  │  │ created_at      │  │  └──────────────────┘
│ phone        │  │  └─────────────────┘  │
│ created_at   │  │                       │  ┌──────────────────┐
│ updated_at   │  │  ┌─────────────────┐  │  │ MedicalDocuments │
└──────────────┘  │  │ ChatHistory     │  │  ├──────────────────┤
                  ├──│ user_id (FK)    │  │  │ id (PK)          │
                  │  │ conversation_id │  ├──│ user_id (FK)     │
                  │  │ role            │  │  │ filename         │
                  │  │ content         │  │  │ original_filename│
                  │  │ agent_used      │  │  │ file_type        │
                  │  │ created_at      │  │  │ extracted_text   │
                  │  └─────────────────┘  │  │ analysis (JSON)  │
                  │                       │  │ uploaded_at      │
                  └───────────────────────┘  └──────────────────┘
```

---

## 🔒 Security & Privacy

### Security Measures
- **Authentication**: JWT-based with bcrypt password hashing
- **Authorization**: Role-based access control
- **Input Validation**: Pydantic schema validation on all endpoints
- **CORS**: Configured whitelist of allowed origins
- **File Upload**: Type validation, size limits, virus scanning hooks
- **SQL Injection**: Prevented via SQLAlchemy ORM
- **XSS Prevention**: Input sanitization, CSP headers
- **Rate Limiting**: Per-endpoint rate limits

### HIPAA-like Considerations
- **Data Encryption**: At-rest and in-transit encryption
- **Audit Logging**: All data access is logged
- **Data Minimization**: Only necessary health data collected
- **Access Controls**: User can only access their own data
- **Consent Management**: Users agree to data processing terms
- **Data Retention**: Configurable retention policies
- **Right to Deletion**: Users can delete their data

> ⚠️ **Disclaimer**: This is an educational project. For production healthcare deployment, obtain proper HIPAA compliance certification, conduct security audits, and consult with healthcare compliance experts.

---

## 🐳 Deployment

### Docker Deployment
```bash
docker-compose up --build -d
```

### AWS Deployment Architecture
```
Route 53 → CloudFront → ALB
                          ├── ECS (Backend)
                          ├── RDS (PostgreSQL)
                          ├── ElastiCache (Redis)
                          ├── S3 (Documents)
                          └── CloudWatch (Monitoring)
```

### CI/CD Pipeline
```
GitHub Push → GitHub Actions → Test → Build Docker → Push ECR → Deploy ECS
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
python -m pytest tests/ -v --cov=app

# Frontend tests
cd frontend
npm test

# API Integration tests
python -m pytest tests/integration/ -v

# Load testing
locust -f tests/load/locustfile.py
```

---

## 📊 Monitoring

- **Application Metrics**: Prometheus + Grafana
- **Log Aggregation**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **APM**: OpenTelemetry traces
- **Health Checks**: `/health` endpoint monitoring
- **Alerting**: PagerDuty/Slack notifications

---

## 📝 Evaluation Metrics

| Component | Metric | Target |
|---|---|---|
| Symptom Analysis | Accuracy, Precision, Recall | >85% |
| OCR Extraction | Character Error Rate (CER) | <5% |
| NER | F1 Score | >90% |
| Risk Prediction | AUC-ROC, Accuracy | >85% |
| RAG Retrieval | Relevance@K, NDCG | >0.8 |
| API Performance | P99 Latency | <2s |
| Voice Recognition | Word Error Rate (WER) | <10% |

---

## 🔬 Research Scope

This project has potential for academic publication in:

1. **Multi-Agent Systems in Healthcare**: Novel supervisor-agent architecture for medical query routing
2. **RAG for Medical Literature**: Domain-specific retrieval-augmented generation
3. **Accessible Healthcare AI**: Voice-enabled AI for healthcare accessibility
4. **Disease Risk Prediction**: Ensemble ML models for preventive healthcare
5. **Medical Document Understanding**: Combined OCR + NER pipeline for prescriptions

### Suggested Conferences/Journals
- AMIA Annual Symposium
- Journal of Medical Internet Research (JMIR)
- ACL/EMNLP (NLP track)
- IEEE EMBS

---

## 🚀 Future Roadmap

- [ ] Multi-language support (Hindi, Spanish, etc.)
- [ ] Integration with wearable devices (Apple Health, Fitbit)
- [ ] Real-time health monitoring dashboard
- [ ] Telemedicine video consultation integration
- [ ] Drug-drug interaction checker
- [ ] Mental health assessment module
- [ ] Integration with hospital EHR systems (FHIR/HL7)
- [ ] Federated learning for privacy-preserving model training
- [ ] Mobile application (React Native)
- [ ] Blockchain-based health records
- [ ] Advanced imaging analysis (X-ray, MRI interpretation)
- [ ] Personalized nutrition recommendations

---

## 📄 Resume Description

> **Multi-Agent Healthcare Intelligence Assistant** — *Full Stack AI Project*
> 
> Architected and developed a production-grade multi-agent healthcare AI platform combining 9+ AI/ML disciplines. Implemented supervisor-agent architecture using LangGraph to orchestrate specialized AI agents for symptom analysis, medical report explanation (OCR + NLP), disease risk prediction (ML), and evidence-based medical Q&A (RAG). Built React frontend with premium UI/UX, FastAPI backend with JWT authentication, ChromaDB vector store for medical literature retrieval, and scikit-learn models achieving >85% AUC-ROC for disease risk prediction. Integrated voice AI using Web Speech API for hands-free consultation.
> 
> **Technologies**: Python, FastAPI, React, LangGraph, Google Gemini, Scikit-learn, ChromaDB, Tesseract OCR, SpaCy, Docker, PostgreSQL

---

## ❓ Viva / Interview Questions

<details>
<summary>Click to expand</summary>

1. **Why multi-agent vs single LLM?** — Specialization allows each agent to have domain-specific prompts, tools, and context, improving accuracy.
2. **How does the supervisor route queries?** — Intent classification using keyword matching + LLM classification.
3. **Why ChromaDB for vector storage?** — Lightweight, embeddable, no server needed, perfect for medical text retrieval.
4. **How do you handle hallucinations?** — RAG grounds responses in retrieved medical literature; disclaimers on all medical advice.
5. **Explain the OCR pipeline** — Image preprocessing (threshold, denoise) → Tesseract extraction → NER for structured data.
6. **How are risk models trained?** — Synthetic data with clinically-accurate distributions → RandomForest classifiers.
7. **HIPAA compliance approach?** — Encryption, access controls, audit logs, data minimization, consent management.
8. **Voice AI architecture?** — Browser Web Speech API for STT → AI processing → TTS for response.
9. **How does RAG improve over pure LLM?** — Retrieves relevant medical texts from vector store, reducing hallucination and providing citations.
10. **Scaling strategy?** — Docker containers on ECS, auto-scaling groups, read replicas for DB.

</details>

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This is an **educational and research project**. It is NOT intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions. The AI-generated insights should be used for informational purposes only.

---

<div align="center">

**Built with ❤️ for Healthcare AI Innovation**

*Star ⭐ this repository if you find it helpful!*

</div>
