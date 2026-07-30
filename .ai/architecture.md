# Architecture

Forge follows Domain Driven Design.

Layers

UI

↓

Application

↓

Domain

↓

Infrastructure

↓

Database

Never allow UI components to directly access Supabase.

Always use Use Cases.

All business rules belong in Domain.

The database is not the source of truth.

The Domain is the source of truth.