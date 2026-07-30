-- Migration: 0001_initial_schema.sql
-- Description: Base database schema for Forge (Supabase PostgreSQL + RLS)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES (Extends Supabase auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    height_cm NUMERIC(5, 2),
    weight_kg NUMERIC(5, 2),
    fitness_goal TEXT CHECK (fitness_goal IN ('hypertrophy', 'strength', 'fat_loss', 'endurance', 'general_health')),
    experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- 2. USER RANKS & GAMIFICATION
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_ranks (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_rank TEXT NOT NULL DEFAULT 'Bronce I' CHECK (current_rank IN (
        'Bronce I', 'Bronce II', 'Bronce III',
        'Plata I', 'Plata II', 'Plata III',
        'Oro I', 'Oro II', 'Oro III',
        'Platino I', 'Platino II', 'Platino III',
        'Diamante', 'Gladiador', 'Inmortal'
    )),
    total_xp BIGINT NOT NULL DEFAULT 0,
    current_streak_days INT NOT NULL DEFAULT 0,
    longest_streak_days INT NOT NULL DEFAULT 0,
    last_workout_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_ranks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User ranks are viewable by everyone."
    ON public.user_ranks FOR SELECT USING (true);

CREATE POLICY "System/Users can update own rank."
    ON public.user_ranks FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 3. EXERCISES CATALOG
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    muscle_group TEXT NOT NULL CHECK (muscle_group IN ('chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full_body')),
    secondary_muscles TEXT[] DEFAULT '{}',
    category TEXT NOT NULL CHECK (category IN ('barbell', 'dumbbell', 'machine', 'cable', 'bodyweight', 'cardio')),
    equipment TEXT,
    instructions TEXT,
    video_url TEXT,
    is_custom BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercises are viewable by authenticated users."
    ON public.exercises FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create custom exercises."
    ON public.exercises FOR INSERT WITH CHECK (auth.uid() = created_by OR created_by IS NULL);

-- ============================================================================
-- 4. WORKOUTS & WORKOUT SETS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Entrenamiento',
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'discarded')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    total_duration_seconds INT DEFAULT 0,
    total_volume_kg NUMERIC(10, 2) DEFAULT 0.00,
    xp_earned INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own workouts."
    ON public.workouts FOR ALL USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.workout_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE RESTRICT,
    set_index INT NOT NULL,
    set_type TEXT NOT NULL DEFAULT 'working' CHECK (set_type IN ('warmup', 'working', 'failure', 'drop_set')),
    weight_kg NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    reps INT NOT NULL DEFAULT 0,
    rpe NUMERIC(3, 1) CHECK (rpe IS NULL OR (rpe >= 1 AND rpe <= 10)),
    is_completed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage workout sets of their workouts."
    ON public.workout_sets FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.workouts w 
            WHERE w.id = workout_sets.workout_id AND w.user_id = auth.uid()
        )
    );

-- ============================================================================
-- 5. PROGRESS SNAPSHOTS & EVIDENCE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.progress_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    body_weight_kg NUMERIC(5, 2),
    total_monthly_volume_kg NUMERIC(12, 2) DEFAULT 0,
    momentum_score NUMERIC(5, 2) DEFAULT 100.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, date)
);

ALTER TABLE public.progress_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and edit own progress snapshots."
    ON public.progress_snapshots FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- 6. CIRCLES (Private Social Groups)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.circles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    invite_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.circles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.circle_members (
    circle_id UUID NOT NULL REFERENCES public.circles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (circle_id, user_id)
);

ALTER TABLE public.circle_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circle members can view their circles."
    ON public.circles FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.circle_members cm WHERE cm.circle_id = circles.id AND cm.user_id = auth.uid())
    );

CREATE POLICY "Circle members can view member list."
    ON public.circle_members FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.circle_members cm WHERE cm.circle_id = circle_members.circle_id AND cm.user_id = auth.uid())
    );

-- ============================================================================
-- AUTOMATIC TRIGGER FOR PROFILE CREATION ON SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::text FROM 1 FOR 8)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', 'Atleta Forge'),
        NEW.raw_user_meta_data->>'avatar_url'
    );

    INSERT INTO public.user_ranks (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
