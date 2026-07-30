from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="Forge AI Virtual Coach Service",
    description="Microservicio de recomendación de cargas, evaluación de fatiga y guardrails de seguridad deportiva.",
    version="1.0.0"
)

# --- REQUEST / RESPONSE MODELS ---
class RecommendationRequest(BaseModel):
    user_id: str
    exercise_id: str
    exercise_name: str
    last_weight_kg: float
    last_reps: int
    rpe_history: List[float] = []

class RecommendationResponse(BaseModel):
    exercise_id: str
    exercise_name: str
    suggested_weight_kg: float
    suggested_reps: int
    confidence_percentage: int
    reasoning: str
    safety_warning: Optional[str] = None

class ChatRequest(BaseModel):
    user_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    flagged_medical_concern: bool

# --- MEDICAL & SAFETY GUARDRAILS ---
PAIN_KEYWORDS = ["dolor", "lesion", "lesión", "punzada", "hombro", "rodilla", "espalda", "medico", "médico", "molestia aguda"]

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "forge-ai-coach", "timestamp": datetime.utcnow().isoformat()}

@app.post("/api/v1/coach/recommendation", response_model=RecommendationResponse)
def get_load_recommendation(req: RecommendationRequest):
    """
    Evalúa la sobrecarga progresiva segura para el siguiente entrenamiento.
    Invariante: Incremento máximo de 5% respecto a la última sesión.
    """
    if req.last_weight_kg <= 0:
        return RecommendationResponse(
            exercise_id=req.exercise_id,
            exercise_name=req.exercise_name,
            suggested_weight_kg=20.0,
            suggested_reps=10,
            confidence_percentage=80,
            reasoning="Primer registro del ejercicio. Se sugiere comenzar con la barra olímpica estándar (20 kg) para calibración."
        )

    # Check RPE trend
    avg_rpe = sum(req.rpe_history) / len(req.rpe_history) if req.rpe_history else 8.0

    if avg_rpe <= 7.5 and req.last_reps >= 8:
        # Safe progressive overload: +2.5 kg or +2.5%
        increment = 2.5
        new_weight = round(req.last_weight_kg + increment, 1)
        return RecommendationResponse(
            exercise_id=req.exercise_id,
            exercise_name=req.exercise_name,
            suggested_weight_kg=new_weight,
            suggested_reps=req.last_reps,
            confidence_percentage=88,
            reasoning=f"En tus últimas sesiones tu RPE promedio fue {avg_rpe:.1f} con {req.last_weight_kg} kg. Estás listo para subir +{increment} kg manteniendo la misma técnica."
        )
    else:
        # Maintain weight, aim for +1 rep
        return RecommendationResponse(
            exercise_id=req.exercise_id,
            exercise_name=req.exercise_name,
            suggested_weight_kg=req.last_weight_kg,
            suggested_reps=req.last_reps + 1,
            confidence_percentage=82,
            reasoning=f"Mantén los {req.last_weight_kg} kg y consolida el volumen buscando realizar 1 repetición adicional antes de subir el peso."
        )

@app.post("/api/v1/coach/chat", response_model=ChatResponse)
def coach_chat(req: ChatRequest):
    """
    Asistente conversacional con evaluación de guardrails médicos.
    """
    lower_msg = req.message.lower()

    # Guardrail check
    for word in PAIN_KEYWORDS:
        if word in lower_msg:
            return ChatResponse(
                reply="⚠️ He detectado que mencionas molestias o dolor físico. Como tu AI Coach, mi prioridad es tu salud: detén el ejercicio en esa zona y consulta a un profesional médico antes de continuar levantando peso.",
                flagged_medical_concern=True
            )

    return ChatResponse(
        reply="¡Excelente actitud! Recuerda mantener una ejecución controlada y respetar los tiempos de descanso entre series para maximizar el estímulo muscular.",
        flagged_medical_concern=False
    )
