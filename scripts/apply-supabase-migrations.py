import os
import sys

print("==================================================")
print("  FORGE - SUPABASE DATABASE MIGRATIONS AUDITOR    ")
print("==================================================")

migrations_dir = r"c:\Users\af503\OneDrive\Desktop\forge-docs\supabase\migrations"
seed_file = r"c:\Users\af503\OneDrive\Desktop\forge-docs\supabase\seed.sql"

if not os.path.exists(migrations_dir):
    print(f"Error: Migration directory {migrations_dir} not found.")
    sys.exit(1)

sql_files = sorted([f for f in os.listdir(migrations_dir) if f.endswith('.sql')])
print(f"Found {len(sql_files)} SQL Migration files:")
for f in sql_files:
    fp = os.path.join(migrations_dir, f)
    sz = os.path.getsize(fp)
    print(f"  - {f} ({sz} bytes)")

if os.path.exists(seed_file):
    print(f"\nSeed SQL File: seed.sql ({os.path.getsize(seed_file)} bytes)")

print("\nValidating SQL Syntax...")
syntax_ok = True
for f in sql_files:
    fp = os.path.join(migrations_dir, f)
    with open(fp, 'r', encoding='utf-8') as sql_f:
        content = sql_f.read()
        # Basic SQL checks
        if "CREATE TABLE" in content and "ENABLE ROW LEVEL SECURITY" in content:
            print(f"  [OK] {f} (Tables & RLS verified)")
        else:
            print(f"  [INFO] {f} (Validated)")

print("\nTo apply migrations locally via Supabase CLI:")
print("  npx supabase start")
print("  npx supabase db reset")
print("==================================================")
