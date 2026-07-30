-- Seed Data: Standard Exercise Catalog for Forge

INSERT INTO public.exercises (id, name, muscle_group, secondary_muscles, category, equipment, instructions, is_custom)
VALUES
    (
        'e0000000-0000-0000-0000-000000000001',
        'Press de Banca Plano con Barra',
        'chest',
        ARRAY['shoulders', 'arms'],
        'barbell',
        'Barra olímpica y banco plano',
        'Acuéstate sobre el banco, sujeta la barra con agarre ligeramente superior al ancho de hombros, desciende el peso de forma controlada hasta tocar el pecho medio y empuja explosivamente hacia arriba.',
        FALSE
    ),
    (
        'e0000000-0000-0000-0000-000000000002',
        'Sentadilla Trasera con Barra',
        'legs',
        ARRAY['core'],
        'barbell',
        'Barra y rack de sentadillas',
        'Coloca la barra sobre los trapecios altos, mantén el torso firme, desciende flexionando rodillas y cadera hasta que los muslos queden al menos paralelos al suelo.',
        FALSE
    ),
    (
        'e0000000-0000-0000-0000-000000000003',
        'Peso Muerto Convencional',
        'back',
        ARRAY['legs', 'core'],
        'barbell',
        'Barra olímpica y discos',
        'Posiciónate con los pies al ancho de cadera, sujeta la barra por fuera de las espinillas, mantén la columna neutra y extiende caderas y rodillas simultáneamente.',
        FALSE
    ),
    (
        'e0000000-0000-0000-0000-000000000004',
        'Press Militar de Pie con Barra',
        'shoulders',
        ARRAY['arms', 'core'],
        'barbell',
        'Barra olímpica',
        'Sujeta la barra a la altura de las clavículas y empuja verticalmente sobre la cabeza manteniendo los glúteos y el abdomen en tensión.',
        FALSE
    ),
    (
        'e0000000-0000-0000-0000-000000000005',
        'Dominadas Pronadas (Pull-Ups)',
        'back',
        ARRAY['arms'],
        'bodyweight',
        'Barra de dominadas',
        'Sujeta la barra con las palmas mirando hacia afuera y tracciona el cuerpo hasta que la barbilla supere la barra.',
        FALSE
    ),
    (
        'e0000000-0000-0000-0000-000000000006',
        'Cur de Bíceps con Mancuernas',
        'arms',
        ARRAY[]::text[],
        'dumbbell',
        'Mancuernas',
        'Flexiona los codos manteniendo los brazos pegados al torso y supinando la muñeca en la parte superior.',
        FALSE
    )
ON CONFLICT (id) DO NOTHING;
