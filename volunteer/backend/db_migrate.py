import asyncio
from sqlalchemy import text
from database import engine

async def migrate():
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE volunteers ADD COLUMN skills TEXT DEFAULT '[]';"))
            print("Successfully added 'skills' column to 'volunteers' table.")
        except Exception as e:
            print(f"Error (maybe column exists?): {e}")

if __name__ == "__main__":
    asyncio.run(migrate())
