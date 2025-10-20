from app import app, db, User

print("Creating database...")

with app.app_context():
    # Drop all tables first
    db.drop_all()
    print("Dropped all tables")
    
    # Create all tables
    db.create_all()
    print("Created all tables")
    
    # Verify
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    
    tables = inspector.get_table_names()
    print(f"\nTables created: {tables}")
    
    if 'user' in tables:
        columns = inspector.get_columns('user')
        print("\nColumns in user table:")
        for col in columns:
            print(f"  - {col['name']}")
    else:
        print("\nERROR: user table was not created!")

print("\nDone!")
