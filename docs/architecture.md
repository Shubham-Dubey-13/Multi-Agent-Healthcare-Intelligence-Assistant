# Multi-Agent Healthcare Intelligence Assistant
# Complete Architecture & Design Document

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Real-world Use Cases](#3-real-world-use-cases)
4. [Complete System Architecture](#4-complete-system-architecture)
5. [Multi-Agent Design](#5-multi-agent-design)
6. [LangGraph Workflow](#6-langgraph-workflow)
7. [CrewAI Workflow](#7-crewai-workflow)
8. [OCR Pipeline](#8-ocr-pipeline)
9. [Medical Report Analysis Pipeline](#9-medical-report-analysis-pipeline)
10. [RAG Pipeline](#10-rag-pipeline-using-medical-literature)
11. [Disease Risk Prediction Models](#11-disease-risk-prediction-models)
12. [Medical Text Classification](#12-medical-text-classification)
13. [Named Entity Recognition](#13-named-entity-recognition-using-biobertclinicalbert)
14. [Recommendation Engine](#14-recommendation-engine)
15. [Voice Assistant Architecture](#15-voice-assistant-architecture)
16. [Vector Database Design](#16-vector-database-design)
17. [Database Schema](#17-database-schema)
18. [API Design](#18-api-design)
19. [Frontend Design](#19-frontend-design)
20. [Backend Design](#20-backend-design)
21. [Folder Structure](#21-folder-structure)
22. [Deployment Architecture](#22-deployment-architecture)
23. [Docker Setup](#23-docker-setup)
24. [AWS Deployment](#24-aws-deployment)
25. [Security Considerations](#25-security-considerations)
26. [Privacy and HIPAA-like Considerations](#26-privacy-and-hipaa-like-considerations)
27. [Evaluation Metrics](#27-evaluation-metrics)
28. [Testing Strategy](#28-testing-strategy)
29. [CI/CD Pipeline](#29-cicd-pipeline)
30. [Monitoring and Logging](#30-monitoring-and-logging)
31. [Resume Description](#31-resume-description)
32. [GitHub README Structure](#32-github-readme-structure)
33. [Research Paper Scope](#33-research-paper-scope)
34. [Viva Questions](#34-viva-questions)
35. [Future Scope](#35-future-scope)

---

## 1. Project Overview

The Multi-Agent Healthcare Intelligence Assistant is a production-grade AI platform that orchestrates 9 specialized AI agents to deliver comprehensive healthcare intelligence. Unlike monolithic chatbots that use a single LLM for everything, this system employs a **supervisor-agent architecture** where each agent is an expert in its domain.

### Key Innovation Points
- **Multi-Agent Orchestration**: LangGraph-based supervisor routes queries to domain-specific agents
- **Multimodal Input**: Text, voice, images (prescriptions/reports)
- **Evidence-Based**: RAG pipeline grounds responses in medical literature
- **Predictive Analytics**: ML models for disease risk assessment
- **Full Stack**: Production-ready frontend + backend + deployment

### Technologies Integrated
| Category | Technologies |
|---|---|
| Agentic AI | LangGraph, Supervisor-Agent Pattern |
| Generative AI | Google Gemini API |
| Machine Learning | Scikit-learn (RandomForest, GradientBoosting) |
| NLP | SpaCy, Medical NER, Text Classification |
| OCR | Tesseract, OpenCV, Pillow |
| RAG | ChromaDB, Sentence-Transformers, LangChain |
| Voice AI | Web Speech API (STT/TTS) |
| Vector DB | ChromaDB with HNSW indexing |
| Full Stack | React, FastAPI, SQLAlchemy, JWT |

---

## 2. Problem Statement

### The Healthcare Information Gap

**For Patients:**
- Medical reports contain complex terminology and numerical values that are incomprehensible to most patients
- Patients cannot assess the urgency of their symptoms or know which specialist to consult
- Health data is fragmented across multiple providers with no unified view
- Medical literature is inaccessible to non-medical professionals
- Patients with disabilities need accessible interfaces (voice)

**For Healthcare Systems:**
- 30-40% of outpatient visits are for conditions that could be triaged by intelligent systems
- Healthcare professionals spend significant time explaining routine lab results
- Preventive care (risk prediction) is underutilized
- Patient health literacy remains low globally

### Our Solution
An AI system that acts as a **health intelligence layer** between patients and the healthcare system, providing instant, evidence-based, and personalized health insights while maintaining privacy and including appropriate medical disclaimers.

---

## 3. Real-world Use Cases

### Primary Use Cases

**UC1: Symptom Triage**
- User: "I have a persistent headache, blurred vision, and neck stiffness for 3 days"
- System: Analyzes symptom combination → Identifies possible conditions (migraine, meningitis, hypertension) → Assigns urgency → Recommends neurologist/ER visit
- Agents: SymptomAnalyzer → SpecialistRecommender

**UC2: Lab Report Interpretation**
- User: Uploads blood test PDF/image
- System: OCR extracts values → Compares with reference ranges → Flags abnormalities → Explains each parameter in plain language
- Agents: OCRAgent → ReportExplainer → SummaryGenerator

**UC3: Prescription Understanding**
- User: Uploads handwritten prescription image
- System: OCR extracts → NER identifies medications, dosages → Explains each medication's purpose
- Agents: OCRAgent → NER Pipeline → RAGAgent

**UC4: Disease Risk Assessment**
- User: Inputs health parameters (age, BMI, BP, lifestyle)
- System: ML models predict diabetes/cardiac/hypertension risk → Provides personalized prevention recommendations
- Agents: RiskPredictor → SummaryGenerator

**UC5: Medical Q&A**
- User: "What are the side effects of Metformin?"
- System: RAG retrieves from medical knowledge base → Generates evidence-based answer with sources
- Agents: RAGAgent

**UC6: Health Monitoring**
- User: Logs daily health metrics (BP, blood sugar, weight)
- System: Tracks trends over time → Alerts on concerning patterns → Generates periodic health summaries
- Agents: SummaryGenerator

---

## 4. Complete System Architecture

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER                                                  │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│ │ Web App      │ │ Voice UI     │ │ Mobile       │ │ PDF        │  │
│ │ (React+Vite) │ │ (Speech API) │ │ (Future)     │ │ Reports    │  │
│ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └─────┬──────┘  │
└────────┼────────────────┼────────────────┼───────────────┼──────────┘
         │                │                │               │
┌────────┴────────────────┴────────────────┴───────────────┴──────────┐
│ API LAYER                                                           │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │ FastAPI Gateway                                              │    │
│ │ ┌─────┐ ┌──────┐ ┌───────┐ ┌─────────┐ ┌────────────────┐  │    │
│ │ │Auth │ │CORS  │ │Rate   │ │Validation│ │Error Handling  │  │    │
│ │ │JWT  │ │      │ │Limit  │ │Pydantic  │ │                │  │    │
│ │ └─────┘ └──────┘ └───────┘ └─────────┘ └────────────────┘  │    │
│ └──────────────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│ INTELLIGENCE LAYER                                                  │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │ Agent Orchestrator (LangGraph)                               │    │
│ │                                                              │    │
│ │ ┌──────────────┐    ┌─────────────────────────────────────┐ │    │
│ │ │  Supervisor   │───▶│  Intent Classification Engine     │ │    │
│ │ └──────┬───────┘    └─────────────────────────────────────┘ │    │
│ │        │                                                     │    │
│ │ ┌──────┴──────────────────────────────────────────────┐     │    │
│ │ │                   Agent Pool                         │     │    │
│ │ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │     │    │
│ │ │ │Symptom  │ │Report   │ │OCR      │ │RAG      │   │     │    │
│ │ │ │Analyzer │ │Explainer│ │Agent    │ │Agent    │   │     │    │
│ │ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │     │    │
│ │ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │     │    │
│ │ │ │Risk     │ │Specialist│ │Summary  │ │Voice   │   │     │    │
│ │ │ │Predictor│ │Recommend │ │Generator│ │Agent   │   │     │    │
│ │ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │     │    │
│ │ └──────────────────────────────────────────────────────┘     │    │
│ └──────────────────────────────────────────────────────────────┘    │
│                                                                     │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │ ML Pipeline Layer                                            │    │
│ │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐ │    │
│ │ │OCR     │ │NER     │ │Risk ML │ │Text    │ │Report      │ │    │
│ │ │Pipeline│ │Pipeline│ │Pipeline│ │Classify│ │Parser      │ │    │
│ │ └────────┘ └────────┘ └────────┘ └────────┘ └────────────┘ │    │
│ └──────────────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│ DATA LAYER                                                          │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ PostgreSQL │ │ ChromaDB   │ │ Redis      │ │ File       │        │
│ │ / SQLite   │ │ (Vectors)  │ │ (Cache)    │ │ Storage    │        │
│ │            │ │            │ │            │ │ (Uploads)  │        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│ EXTERNAL SERVICES                                                   │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐                       │
│ │ Google     │ │ PubMed     │ │ Drug       │                       │
│ │ Gemini API │ │ API        │ │ Database   │                       │
│ └────────────┘ └────────────┘ └────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Multi-Agent Design

### Agent Design Principles

1. **Single Responsibility**: Each agent handles one domain
2. **Composability**: Agents can be chained (e.g., OCR → ReportExplainer)
3. **Graceful Degradation**: If one agent fails, others continue working
4. **State Management**: Shared state via LangGraph for context passing
5. **Observability**: Each agent logs its actions and results

### Agent Specifications

#### Supervisor Agent
- **Purpose**: Routes incoming queries to appropriate specialist agents
- **Input**: User message + context
- **Output**: Agent selection + processed result
- **Logic**: Keyword matching → LLM-based intent classification → confidence-based routing
- **Fallback**: If confidence < threshold, asks clarifying question

#### Symptom Analyzer Agent
- **Purpose**: Analyzes symptoms and suggests possible conditions
- **Input**: Symptom list, duration, severity
- **Output**: Possible conditions with confidence, risk level, explanation
- **Knowledge**: Built-in symptom-condition mapping + LLM for nuanced analysis
- **Safety**: Always includes medical disclaimer, flags emergency symptoms

#### Report Explainer Agent
- **Purpose**: Explains lab report values in plain language
- **Input**: Extracted text from medical report
- **Output**: Parameter-by-parameter explanation with normal ranges
- **Knowledge**: Reference ranges for 50+ common lab tests
- **Logic**: Parse values → Compare ranges → Classify (normal/borderline/abnormal) → Generate explanation

#### OCR Agent
- **Purpose**: Extracts text from medical document images
- **Input**: Image file (prescription, lab report, medical record)
- **Output**: Extracted text + structured entities
- **Pipeline**: Preprocess → Tesseract OCR → NER → Structured output
- **Preprocessing**: Grayscale, threshold, denoise, deskew

#### RAG Agent
- **Purpose**: Answers medical questions using retrieved literature
- **Input**: User question
- **Output**: Evidence-based answer with source citations
- **Pipeline**: Embed query → Retrieve from ChromaDB → Rerank → Generate with context
- **Knowledge Base**: Medical knowledge articles, drug information, condition descriptions

#### Risk Predictor Agent
- **Purpose**: Predicts disease risk using ML models
- **Input**: Patient health features (age, BMI, BP, lifestyle, etc.)
- **Output**: Risk scores for diabetes, cardiac disease, hypertension
- **Models**: RandomForest classifiers trained on synthetic data
- **Output Format**: Risk probability + risk level + contributing factors + recommendations

#### Specialist Recommender Agent
- **Purpose**: Recommends appropriate medical specialists
- **Input**: Symptoms, possible conditions, or diagnosis
- **Output**: Specialist type, reason, urgency level
- **Knowledge**: Condition-to-specialist mapping for 100+ conditions

#### Summary Generator Agent
- **Purpose**: Creates health summaries and PDF reports
- **Input**: Patient data, history, metrics, analysis results
- **Output**: Structured summary + downloadable PDF
- **PDF**: Uses ReportLab for professional-quality report generation

---

## 6. LangGraph Workflow

### State Schema
```python
class HealthState(TypedDict):
    user_message: str
    intent: str
    context: dict
    agent_results: list[dict]
    final_response: str
    metadata: dict
```

### Graph Definition
```python
workflow = StateGraph(HealthState)

# Add nodes
workflow.add_node("classify_intent", classify_intent)
workflow.add_node("symptom_analysis", symptom_analysis)
workflow.add_node("report_explanation", report_explanation)
workflow.add_node("risk_prediction", risk_prediction)
workflow.add_node("rag_query", rag_query)
workflow.add_node("specialist_recommendation", specialist_recommendation)
workflow.add_node("generate_summary", generate_summary)
workflow.add_node("general_chat", general_chat)

# Add edges
workflow.set_entry_point("classify_intent")
workflow.add_conditional_edges(
    "classify_intent",
    route_by_intent,
    {
        "symptom": "symptom_analysis",
        "report": "report_explanation",
        "risk": "risk_prediction",
        "question": "rag_query",
        "general": "general_chat",
    }
)
workflow.add_edge("symptom_analysis", "specialist_recommendation")
workflow.add_edge("specialist_recommendation", "generate_summary")
workflow.add_edge("report_explanation", "generate_summary")
workflow.add_edge("risk_prediction", "generate_summary")
workflow.add_edge("generate_summary", END)
workflow.add_edge("rag_query", END)
workflow.add_edge("general_chat", END)
```

---

## 7. CrewAI Workflow

### Comprehensive Health Assessment Crew
```python
crew = Crew(
    agents=[
        Agent(role="Medical Researcher", goal="Research patient's conditions"),
        Agent(role="Risk Analyst", goal="Assess health risks"),
        Agent(role="Report Writer", goal="Generate comprehensive report"),
    ],
    tasks=[
        Task(description="Analyze patient symptoms and history"),
        Task(description="Run risk prediction models"),
        Task(description="Compile findings into health summary"),
    ],
    process=Process.sequential
)
```

---

## 8. OCR Pipeline

### Pipeline Architecture
```
Image Input
    │
    ▼
┌─────────────────┐
│ Preprocessing    │
│ ├─ Grayscale    │
│ ├─ Resize       │
│ ├─ Denoise      │
│ ├─ Threshold    │
│ └─ Deskew       │
└────────┬────────┘
         │
    ▼
┌─────────────────┐
│ Text Extraction  │
│ (Tesseract OCR)  │
└────────┬────────┘
         │
    ▼
┌─────────────────┐
│ Post-processing  │
│ ├─ Spell check  │
│ ├─ Line merge   │
│ └─ Normalize    │
└────────┬────────┘
         │
    ▼
┌─────────────────┐
│ NER Extraction   │
│ ├─ Drugs        │
│ ├─ Dosages      │
│ ├─ Frequencies  │
│ ├─ Conditions   │
│ └─ Test names   │
└────────┬────────┘
         │
    ▼
Structured Output (JSON)
```

---

## 9. Medical Report Analysis Pipeline

### Supported Report Types
- Complete Blood Count (CBC)
- Comprehensive Metabolic Panel (CMP)
- Lipid Panel
- Thyroid Function Tests
- Liver Function Tests
- Kidney Function Tests
- HbA1c (Diabetes marker)

### Analysis Flow
```
Extracted Text → Parameter Identification → Value Extraction → Unit Normalization
    → Reference Range Comparison → Status Classification → Plain Language Generation
```

### Reference Range Example
```json
{
  "Hemoglobin": {
    "male": {"low": 13.5, "high": 17.5, "unit": "g/dL"},
    "female": {"low": 12.0, "high": 16.0, "unit": "g/dL"},
    "interpretation": {
      "low": "Below normal - may indicate anemia",
      "normal": "Within healthy range",
      "high": "Above normal - may indicate polycythemia"
    }
  }
}
```

---

## 10. RAG Pipeline using Medical Literature

### Architecture
```
Knowledge Ingestion:
    Medical Texts → Chunking (512 tokens) → Embedding (all-MiniLM-L6-v2) → ChromaDB

Query Pipeline:
    User Query → Embed Query → Similarity Search (top-k=5) → Rerank → Context Assembly
        → LLM Generation (with system prompt for medical accuracy) → Response + Sources
```

### Knowledge Sources
- Medical textbook excerpts (common conditions)
- Drug information databases
- Clinical guidelines summaries
- Patient education materials
- Lab test interpretation guides

### Chunking Strategy
- Chunk size: 512 tokens
- Overlap: 50 tokens
- Metadata: source, category, date, relevance_score

---

## 11. Disease Risk Prediction Models

### Model Architecture

| Disease | Algorithm | Features | Metric |
|---|---|---|---|
| Diabetes | RandomForest | Age, BMI, BP, glucose, family_history, exercise | AUC-ROC |
| Cardiac | GradientBoosting | Age, cholesterol, BP, smoking, exercise, stress | AUC-ROC |
| Hypertension | RandomForest | Age, BMI, sodium_intake, alcohol, stress, family | AUC-ROC |

### Feature Engineering
```python
features = {
    "age": continuous,
    "gender": binary (0/1),
    "bmi": continuous (calculated from height/weight),
    "systolic_bp": continuous,
    "diastolic_bp": continuous,
    "total_cholesterol": continuous,
    "hdl_cholesterol": continuous,
    "smoking_status": categorical (0=never, 1=former, 2=current),
    "exercise_frequency": ordinal (0-4),
    "family_history_diabetes": binary,
    "family_history_cardiac": binary,
    "alcohol_consumption": ordinal (0-3),
    "stress_level": ordinal (1-5),
    "diet_quality": ordinal (1-5),
}
```

---

## 12. Medical Text Classification

### Intent Classification for Agent Routing
- **Categories**: symptom_analysis, report_explanation, risk_prediction, medical_question, specialist_recommendation, health_summary, general_chat
- **Method**: Keyword matching (primary) + LLM classification (fallback)
- **Confidence**: Each classification includes confidence score

### Medical Document Classification
- **Categories**: Prescription, Lab Report, Discharge Summary, Insurance Document
- **Method**: Text pattern matching + LLM classification

---

## 13. Named Entity Recognition using BioBERT/ClinicalBERT

### Entity Types
| Entity | Examples | Pattern |
|---|---|---|
| DRUG | Metformin, Aspirin, Amoxicillin | Dictionary + SpaCy patterns |
| DOSAGE | 500mg, 10ml, 2 tablets | Regex: `\d+\s*(mg|ml|mcg|tablets?)` |
| FREQUENCY | twice daily, TID, every 8 hours | Pattern matching |
| CONDITION | Diabetes, Hypertension, Asthma | Medical dictionary |
| LAB_TEST | HbA1c, CBC, TSH, LDL | Dictionary |
| BODY_PART | chest, abdomen, throat | Dictionary |
| SYMPTOM | fever, cough, headache, fatigue | Dictionary |

### Implementation
```python
# SpaCy with custom EntityRuler patterns
ruler = nlp.add_pipe("entity_ruler", before="ner")
patterns = [
    {"label": "DRUG", "pattern": "metformin"},
    {"label": "DOSAGE", "pattern": [{"SHAPE": "ddd"}, {"LOWER": "mg"}]},
    {"label": "FREQUENCY", "pattern": [{"LOWER": "twice"}, {"LOWER": "daily"}]},
]
```

### Future Enhancement
- Fine-tune BioBERT on medical NER datasets (BC5CDR, NCBI Disease)
- Use ClinicalBERT for clinical note understanding
- Implement relation extraction (drug-dosage pairs)

---

## 14. Recommendation Engine

### Specialist Recommendation Logic
```
Input: Symptoms + Possible Conditions + Risk Level
    │
    ├── Rule-Based Matching (primary)
    │   └── Condition → Specialist mapping (100+ mappings)
    │
    ├── LLM Enhancement (secondary)
    │   └── For ambiguous cases, use Gemini for reasoning
    │
    └── Output:
        ├── Specialist type (Cardiologist, Neurologist, etc.)
        ├── Reason for recommendation
        ├── Urgency level (routine / soon / urgent / emergency)
        └── What to prepare for the visit
```

### Condition-Specialist Mapping (Sample)
```json
{
    "chest pain": ["Cardiologist", "Emergency Medicine"],
    "persistent headache": ["Neurologist"],
    "skin rash": ["Dermatologist"],
    "joint pain": ["Rheumatologist", "Orthopedist"],
    "anxiety": ["Psychiatrist", "Psychologist"],
    "diabetes": ["Endocrinologist"],
    "breathing difficulty": ["Pulmonologist", "Emergency Medicine"]
}
```

---

## 15. Voice Assistant Architecture

### Architecture
```
Browser Microphone
    │
    ▼
Web Speech API (SpeechRecognition)
    │ Transcript text
    ▼
Chat Interface (same as text input)
    │
    ▼
Agent Processing (same pipeline)
    │ Response text
    ▼
Web Speech API (SpeechSynthesis)
    │ Audio output
    ▼
Browser Speaker
```

### Implementation Details
- **STT**: `window.SpeechRecognition` (Chrome) / `webkitSpeechRecognition`
- **TTS**: `window.speechSynthesis.speak()`
- **Language**: English (en-US) with medical vocabulary support
- **Continuous**: Support for continuous listening mode
- **Visual Feedback**: Waveform animation during listening

---

## 16. Vector Database Design

### ChromaDB Configuration
```python
chroma_client = chromadb.PersistentClient(path="./data/chroma")

medical_collection = chroma_client.get_or_create_collection(
    name="medical_knowledge",
    embedding_function=SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    ),
    metadata={"hnsw:space": "cosine"}
)
```

### Collection Schema
| Field | Type | Description |
|---|---|---|
| id | string | Unique document ID |
| document | string | Medical text chunk |
| metadata.source | string | Source document name |
| metadata.category | string | Topic category |
| metadata.tags | list | Relevant tags |
| embedding | vector[384] | Sentence embedding |

### Indexing Strategy
- **Algorithm**: HNSW (Hierarchical Navigable Small World)
- **Distance Metric**: Cosine similarity
- **Embedding Model**: all-MiniLM-L6-v2 (384 dimensions)
- **Chunk Size**: 512 tokens with 50-token overlap

---

## 17. Database Schema

### SQLAlchemy Models
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Patient History
CREATE TABLE patient_history (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    record_type VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    summary TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Health Metrics
CREATE TABLE health_metrics (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    metric_type VARCHAR(50) NOT NULL,
    value FLOAT NOT NULL,
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT NOW()
);

-- Medical Documents
CREATE TABLE medical_documents (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_type VARCHAR(50),
    extracted_text TEXT,
    analysis_result JSONB,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Chat History
CREATE TABLE chat_history (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    conversation_id VARCHAR(255),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    agent_used VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 18. API Design

### REST API Conventions
- Base URL: `/api/v1/`
- Authentication: Bearer JWT token in Authorization header
- Content Type: `application/json` (except file uploads)
- Error Format: `{"detail": "error message", "status_code": 400}`
- Pagination: `?skip=0&limit=20`

### Endpoint Groups

#### Authentication (`/api/v1/auth/`)
```
POST   /register        → Create account
POST   /login           → Get JWT token
GET    /me              → Get current user
PUT    /profile         → Update profile
```

#### Chat (`/api/v1/chat/`)
```
POST   /message         → Send message to AI
GET    /history/{id}    → Get conversation history
POST   /voice           → Voice message input
```

#### Health (`/api/v1/health/`)
```
POST   /analyze-symptoms    → Symptom analysis
POST   /analyze-report      → Report analysis
POST   /predict-risk        → Risk prediction
GET    /summary/{user_id}   → Health summary
POST   /metrics             → Add health metric
GET    /metrics/{user_id}   → Get health metrics
GET    /history/{user_id}   → Patient history
```

#### Documents (`/api/v1/documents/`)
```
POST   /upload           → Upload document
GET    /{user_id}        → List documents
GET    /detail/{doc_id}  → Document details
POST   /ocr              → OCR extraction
```

#### RAG (`/api/v1/rag/`)
```
POST   /query            → Query medical literature
POST   /index            → Index new document
GET    /stats            → Vector DB statistics
```

#### Reports (`/api/v1/reports/`)
```
POST   /generate-pdf     → Generate PDF report
GET    /{user_id}        → List reports
```

---

## 19. Frontend Design

### Design Philosophy
- **Light, warm color palette** — not dark/AI-themed
- **Organic feel** — rounded corners, subtle gradients, natural spacing
- **Professional** — suitable for healthcare context
- **Accessible** — meets WCAG AA standards
- **Responsive** — works on desktop and tablet

### Color System
```css
:root {
    --bg-primary: #FAFAF8;        /* Warm off-white background */
    --bg-card: #FFFFFF;           /* White cards */
    --bg-sidebar: #F5F1EC;        /* Warm beige sidebar */
    --color-primary: #5B9A8B;     /* Sage teal */
    --color-primary-light: #8FC0B5;
    --color-primary-dark: #3D7A6D;
    --color-accent: #E8985E;      /* Warm terracotta */
    --color-accent-light: #F2B88A;
    --color-secondary: #7FB5B5;   /* Muted teal */
    --text-primary: #2D3436;
    --text-secondary: #636E72;
    --color-success: #6AB04C;
    --color-warning: #F9CA24;
    --color-danger: #E55039;
}
```

### Page Components
1. **Dashboard** — Welcome card, stats, quick actions, health chart
2. **AI Chat** — Message bubbles, voice input, file attachment
3. **Document Upload** — Drag-and-drop, OCR results, entity highlighting
4. **Symptom Checker** — Step wizard, symptom tags, results cards
5. **Risk Assessment** — Health form, circular risk gauges, recommendations
6. **Reports** — Report list, PDF generation, download
7. **History** — Timeline view, filters, metrics charts
8. **Profile** — User info form, health data, settings

---

## 20. Backend Design

### Layered Architecture
```
Routers (HTTP handlers)
    ↓
Services (Business logic)
    ↓
Agents (AI logic)
    ↓
Pipelines (ML/NLP processing)
    ↓
Models (Data access)
```

### Key Design Decisions
1. **Async everywhere**: All FastAPI endpoints are async
2. **Dependency injection**: Database sessions, auth via FastAPI Depends()
3. **Service layer**: Business logic separated from HTTP handling
4. **Agent abstraction**: Each agent implements a common interface
5. **Pipeline pattern**: Data processing as composable pipeline steps
6. **Graceful degradation**: Missing external services → fallback responses

---

## 21. Folder Structure

*(Detailed in README.md)*

---

## 22. Deployment Architecture

### Development
```
localhost:5173 (Vite dev server) → localhost:8000 (FastAPI)
```

### Production (Docker)
```
Nginx → Frontend container (port 3000) ─┐
     └→ Backend container (port 8000) ──┤
                                         ├→ SQLite/PostgreSQL
                                         ├→ ChromaDB
                                         └→ Redis
```

### Cloud (AWS)
```
Route53 → CloudFront (CDN)
              ├→ S3 (Static frontend)
              └→ ALB (Application Load Balancer)
                   └→ ECS Fargate (Backend containers)
                        ├→ RDS PostgreSQL
                        ├→ ElastiCache Redis
                        ├→ S3 (Document storage)
                        └→ CloudWatch (Monitoring)
```

---

## 23. Docker Setup

### Backend Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y tesseract-ocr libgl1-mesa-glx
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download en_core_web_sm
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
```

---

## 24. AWS Deployment

### Services Used
| Service | Purpose | Configuration |
|---|---|---|
| ECS Fargate | Backend containers | 2 vCPU, 4GB RAM |
| RDS | PostgreSQL database | db.t3.micro |
| S3 | Static frontend + uploads | Standard storage |
| CloudFront | CDN | Global edge locations |
| ElastiCache | Redis cache | cache.t3.micro |
| CloudWatch | Monitoring + logs | Basic monitoring |
| Route53 | DNS | Custom domain |
| ACM | SSL certificates | Auto-renew |
| ECR | Docker registry | Store images |

### Cost Estimate (Monthly)
- ECS Fargate: ~$30
- RDS: ~$15
- S3: ~$5
- CloudFront: ~$10
- ElastiCache: ~$13
- **Total**: ~$73/month

---

## 25. Security Considerations

### Authentication & Authorization
- JWT tokens with expiration (24h)
- bcrypt password hashing (12 rounds)
- Role-based access control (patient, admin)
- Token refresh mechanism
- Account lockout after failed attempts

### Data Protection
- HTTPS/TLS for all communications
- Input validation on every endpoint (Pydantic)
- SQL injection prevention (ORM)
- XSS prevention (input sanitization)
- CSRF protection (SameSite cookies)
- File upload validation (type, size)
- Rate limiting per endpoint

### API Security
- CORS configuration (whitelist origins)
- Request size limits
- Content-Type validation
- Error message sanitization (no stack traces in production)

---

## 26. Privacy and HIPAA-like Considerations

### Data Privacy Principles
1. **Data Minimization**: Collect only necessary health data
2. **Purpose Limitation**: Data used only for stated purposes
3. **Consent**: Explicit user consent for data processing
4. **Access Control**: Users can only access their own data
5. **Right to Deletion**: Users can delete all their data
6. **Audit Trail**: All data access is logged
7. **Encryption**: At-rest and in-transit
8. **Data Retention**: Configurable retention policies

### HIPAA Controls (Educational Reference)
| HIPAA Requirement | Implementation |
|---|---|
| Access Control | JWT + RBAC |
| Audit Controls | Request logging |
| Integrity | Input validation, checksums |
| Transmission Security | TLS/HTTPS |
| Encryption | AES-256 at rest |
| Authentication | Multi-factor (future) |

---

## 27. Evaluation Metrics

### Per-Component Metrics
| Component | Metrics | Target |
|---|---|---|
| Symptom Analysis | Accuracy, Precision, Recall, F1 | >85% |
| OCR Extraction | Character Error Rate (CER), Word Error Rate | <5% CER |
| NER | Precision, Recall, F1 (per entity type) | >90% F1 |
| Risk Prediction | AUC-ROC, Accuracy, Precision, Recall | >85% AUC |
| RAG Retrieval | Precision@K, Recall@K, NDCG@10 | >0.8 NDCG |
| RAG Generation | BLEU, ROUGE-L, Factual Accuracy | >0.7 ROUGE |
| API Performance | P50/P95/P99 Latency, Throughput | <2s P99 |
| Voice Recognition | Word Error Rate (WER) | <10% |
| User Satisfaction | NPS, Task Completion Rate | >4.0/5.0 |

---

## 28. Testing Strategy

### Testing Pyramid
```
         ╱╲
        ╱  ╲         E2E Tests (Cypress/Playwright)
       ╱────╲
      ╱      ╲       Integration Tests (API + DB)
     ╱────────╲
    ╱          ╲      Unit Tests (Functions, Classes)
   ╱────────────╲
```

### Test Categories
1. **Unit Tests**: Individual functions, agent logic, pipeline steps
2. **Integration Tests**: API endpoints with database, agent chains
3. **E2E Tests**: Full user flows through UI
4. **Load Tests**: API under concurrent load (Locust)
5. **Security Tests**: Auth bypass, injection, etc.

---

## 29. CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: '3.11'}
      - run: pip install -r backend/requirements.txt
      - run: cd backend && python -m pytest tests/ -v

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: {node-version: '18'}
      - run: cd frontend && npm install && npm run build

  build-docker:
    needs: [test-backend, test-frontend]
    runs-on: ubuntu-latest
    steps:
      - run: docker-compose build

  deploy:
    needs: build-docker
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: # Push to ECR and deploy to ECS
```

---

## 30. Monitoring and Logging

### Application Monitoring
```
Structured Logging (Python logging)
    → CloudWatch Logs / ELK Stack
    → Dashboards (Grafana)
    → Alerts (Slack/PagerDuty)
```

### Metrics to Track
- API response times (P50, P95, P99)
- Error rates per endpoint
- Agent usage frequency
- ML model prediction distributions
- Document upload volumes
- Active users (DAU/MAU)
- Token usage (LLM API)

### Health Checks
- `/api/v1/health` — Overall system health
- Database connectivity
- ChromaDB availability
- LLM API reachability

---

## 31. Resume Description

### Option 1 (Technical)
> Architected a multi-agent healthcare AI platform using LangGraph supervisor-agent architecture, orchestrating 8+ specialized agents for symptom analysis, report interpretation, and risk prediction. Built OCR pipeline (Tesseract + SpaCy NER) for medical document processing, RAG system (ChromaDB + sentence-transformers) for evidence-based medical Q&A, and scikit-learn models (85%+ AUC-ROC) for disease risk prediction. Full-stack implementation with React/Vite frontend, FastAPI backend, JWT auth, and Docker deployment.

### Option 2 (Impact-focused)
> Developed an AI-powered healthcare intelligence system that democratizes medical report understanding, using multi-agent AI to explain lab results in plain language, predict disease risks, and recommend specialists. Reduced medical report interpretation time by providing instant, evidence-based explanations with appropriate medical context and disclaimers.

---

## 32. GitHub README Structure

*(See README.md in project root — comprehensive README with all sections)*

---

## 33. Research Paper Scope

### Title
"Multi-Agent Architecture for Intelligent Healthcare Assistance: A System Design Approach Combining RAG, NLP, and Predictive Analytics"

### Abstract Topics
1. Novel supervisor-agent architecture for medical query routing
2. Domain-specific RAG for medical literature retrieval
3. Ensemble approach: OCR + NER + Report Analysis pipeline
4. Disease risk prediction with interpretable ML models
5. Accessibility through voice-enabled medical consultation

### Potential Venues
- AMIA Annual Symposium (American Medical Informatics Association)
- Journal of Medical Internet Research (JMIR)
- ACL/EMNLP (NLP track)
- IEEE EMBS (Engineering in Medicine and Biology)
- npj Digital Medicine
- Artificial Intelligence in Medicine journal

---

## 34. Viva Questions

### Architecture & Design
1. Why use multi-agent architecture instead of a single LLM?
2. How does the supervisor agent route queries?
3. What happens when an agent fails?
4. How do agents share state?
5. Why LangGraph over CrewAI for orchestration?

### AI/ML
6. Explain the RAG pipeline step by step.
7. How do you prevent LLM hallucinations in medical context?
8. What embedding model do you use and why?
9. How are risk prediction models trained and validated?
10. What NER approach do you use and why not BioBERT?

### OCR & NLP
11. How do you handle poor quality prescription images?
12. What preprocessing steps improve OCR accuracy?
13. How do you extract structured data from unstructured OCR text?

### Security & Privacy
14. How do you handle sensitive health data?
15. What HIPAA controls are implemented?
16. How is authentication implemented?

### Full Stack
17. Why FastAPI over Django/Flask?
18. How do you handle file uploads securely?
19. Explain the frontend architecture and state management.
20. How would you scale this system?

### Advanced
21. How would you add real-time health monitoring?
22. What's your approach to A/B testing different agents?
23. How would you integrate with hospital EHR systems?
24. What's the cost of running this system in production?
25. How do you evaluate the quality of AI-generated medical advice?

---

## 35. Future Scope

### Short-term (3-6 months)
- [ ] Multi-language support (Hindi, Spanish, Chinese)
- [ ] Mobile app (React Native)
- [ ] Integration with Apple Health / Google Fit
- [ ] Drug-drug interaction checker
- [ ] Advanced charting and health trend analysis

### Medium-term (6-12 months)
- [ ] Fine-tuned medical LLM (BioBERT/ClinicalBERT integration)
- [ ] Telemedicine video consultation
- [ ] Integration with pharmacy APIs for drug ordering
- [ ] Mental health assessment module
- [ ] Nutrition and diet recommendation engine

### Long-term (12-24 months)
- [ ] FHIR/HL7 integration with hospital EHR systems
- [ ] Federated learning for privacy-preserving model training
- [ ] Medical imaging AI (X-ray, MRI interpretation)
- [ ] Blockchain-based health records
- [ ] IoT device integration (blood pressure monitors, glucometers)
- [ ] Clinical decision support system (CDSS)
- [ ] Multi-modal AI (combining text, images, voice, vitals)

---

## Dataset Suggestions

| Dataset | Purpose | Source |
|---|---|---|
| MIMIC-III | Clinical notes, ICU data | PhysioNet |
| PubMedQA | Medical Q&A training | PubMed |
| BC5CDR | NER for drugs and diseases | BioCreative |
| NCBI Disease | Disease NER | NCBI |
| Pima Indians Diabetes | Diabetes prediction | UCI ML Repository |
| Framingham Heart Study | Cardiac risk | National Heart, Lung, Blood Institute |
| ChestX-ray14 | Medical imaging (future) | NIH |
| MedNLI | Medical natural language inference | Physionet |
| Drug Reviews | Sentiment analysis on drugs | UCI ML Repository |
| synthea | Synthetic patient records | Synthea™ |

---

## Milestone-wise Implementation Plan

### Milestone 1: Foundation (Week 1-2)
- [x] Project setup (folders, configs, Docker)
- [x] Backend: FastAPI + database models + auth
- [x] Frontend: React + Vite + design system + routing
- [x] Basic chat interface

### Milestone 2: Core AI (Week 3-4)
- [x] Supervisor agent + intent classification
- [x] Symptom analyzer agent
- [x] Report explainer agent
- [x] Specialist recommender agent

### Milestone 3: Pipelines (Week 5-6)
- [x] OCR pipeline
- [x] NER pipeline
- [x] RAG pipeline with ChromaDB
- [x] ML risk prediction models

### Milestone 4: Integration (Week 7-8)
- [x] Connect all agents to API endpoints
- [x] Frontend ↔ Backend integration
- [x] Voice assistant
- [x] PDF report generation

### Milestone 5: Polish (Week 9-10)
- [ ] Testing (unit + integration)
- [ ] Documentation
- [ ] Docker deployment
- [ ] Performance optimization
- [ ] Security hardening

---

## Interview Questions (Advanced)

### System Design
1. How would you design this system to handle 10,000 concurrent users?
2. What caching strategy would you implement?
3. How would you handle model versioning and A/B testing?

### AI/ML
4. How do you measure and mitigate bias in health risk predictions?
5. What's your approach to handling out-of-distribution medical queries?
6. How would you implement continuous learning from user feedback?

### Production
7. How do you handle LLM API rate limits and failures?
8. What's your disaster recovery plan?
9. How do you handle data migration when the schema changes?
10. What observability tools would you use in production?

---

## Advanced Features (Industry-Level 2026)

1. **Agentic RAG with Self-Reflection**: Agents that evaluate their own outputs and self-correct
2. **Multi-Modal Understanding**: Process images, PDFs, voice, and text uniformly
3. **Personalized Health Models**: Per-user fine-tuning of risk models based on their history
4. **Real-time Streaming**: LLM responses streamed token-by-token
5. **Agent Memory**: Long-term memory across conversations using vector store
6. **Explainable AI**: SHAP/LIME explanations for every ML prediction
7. **Guardrails**: LLM output validation for medical safety
8. **Function Calling**: Agents use tool-calling for database lookups, API calls
9. **Graph RAG**: Knowledge graph-based retrieval for complex medical reasoning
10. **Digital Twin**: Patient digital twin for simulation and prediction
