from whatsapp.client import send_message, send_free_message

async def send_application_pending(phone, volunteer_name, event_name):
    await send_message(phone, "application_pending", [volunteer_name, event_name])

async def send_application_confirmed(phone, volunteer_name, event_name, role):
    await send_message(phone, "application_confirmed", [volunteer_name, event_name, role])

async def send_application_rejected(phone, volunteer_name, event_name):
    await send_message(phone, "application_rejected", [volunteer_name, event_name])

async def send_shift_reminder(phone, volunteer_name, event_name, time, location):
    await send_message(phone, "shift_reminder", [volunteer_name, event_name, time, location])

async def send_task_assigned(phone, message):
    await send_free_message(phone, message)

async def send_emergency_alert(phone, event_name, message):
    await send_free_message(phone, message)