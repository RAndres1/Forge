-- Migration: 0002_storage_and_views.sql
-- Description: Storage buckets for progress photos/avatars + Circle Leaderboard RPC functions

-- ============================================================================
-- 1. STORAGE BUCKETS FOR AVATARS & PROGRESS PHOTOS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('progress_photos', 'progress_photos', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for Storage
CREATE POLICY "Avatar images are publicly accessible."
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar."
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can manage their private progress photos."
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'progress_photos' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ============================================================================
-- 2. CIRCLE LEADERBOARD RPC FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_circle_leaderboard(p_circle_id UUID)
RETURNS TABLE (
    user_id UUID,
    username TEXT,
    display_name TEXT,
    avatar_url TEXT,
    current_rank TEXT,
    total_xp BIGINT,
    weekly_volume_kg NUMERIC,
    weekly_workouts_count BIGINT,
    streak_days INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id AS user_id,
        p.username,
        p.display_name,
        p.avatar_url,
        ur.current_rank,
        ur.total_xp,
        COALESCE(SUM(w.total_volume_kg), 0) AS weekly_volume_kg,
        COUNT(w.id) AS weekly_workouts_count,
        ur.current_streak_days AS streak_days
    FROM public.circle_members cm
    JOIN public.profiles p ON p.id = cm.user_id
    JOIN public.user_ranks ur ON ur.user_id = p.id
    LEFT JOIN public.workouts w ON w.user_id = p.id 
        AND w.status = 'completed'
        AND w.completed_at >= NOW() - INTERVAL '7 days'
    WHERE cm.circle_id = p_circle_id
    GROUP BY p.id, p.username, p.display_name, p.avatar_url, ur.current_rank, ur.total_xp, ur.current_streak_days
    ORDER BY ur.total_xp DESC, weekly_volume_kg DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
