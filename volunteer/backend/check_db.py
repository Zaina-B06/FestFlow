import asyncio
from sqlalchemy import text
from database import engine

async def check_skills_column():
    print("Checking database...")
    try:
        async with engine.begin() as conn:
            # Query MySQL for the column
            result = await conn.execute(text("SHOW COLUMNS FROM volunteers LIKE 'skills';"))
            row = result.fetchone()
            
            print("\n---------------------------------------------------------")
            if row:
                print("✅ YES! The 'skills' column is successfully in your database!")
                print("   Your profile page will save and load perfectly.")
            else:
                print("❌ NO. The 'skills' column is MISSING from your database.")
                print("   You need to run: python db_migrate.py")
            print("---------------------------------------------------------\n")
    except Exception as e:
        print(f"Error connecting to database: {e}")

if __name__ == "__main__":
    asyncio.run(check_skills_column())
