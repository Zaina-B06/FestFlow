from groq.client import ask_groq

async def generate_task_briefing(volunteer_name, task, event_name):
    system = "You are a friendly fest coordinator assistant. Write short, warm, actionable WhatsApp messages for college volunteers. Max 3 sentences. Use 1 relevant emoji."
    user = f"""
    Volunteer: {volunteer_name}
    Event: {event_name}
    Task: {task['title']}
    Location: {task['location']}
    Due: {task['due_time']}
    Notes: {task['notes']}
    """
    return await ask_groq(system, user)


async def summarize_incident(raw_report: str):
    system = """You are an event operations assistant.
    Analyze incident reports and return ONLY valid JSON in this format:
    {"severity": "low|medium|high", "category": "string",
     "summary": "string", "suggested_action": "string"}
    No extra text, just the JSON."""
    return await ask_groq(system, raw_report)


async def answer_volunteer_query(question: str, event_context: dict):
    system = f"""You are a helpful assistant for volunteers at {event_context.get('event_name', 'a college fest')}.
    Answer questions briefly and helpfully using this context: {event_context}.
    Max 2 sentences. Be friendly."""
    return await ask_groq(system, question)


async def craft_emergency_message(raw_input: str):
    system = "You are an emergency coordinator at a college fest. Convert raw situation descriptions into calm, clear, actionable broadcast messages for volunteers. Start with 🚨. Max 2 sentences."
    return await ask_groq(system, raw_input)