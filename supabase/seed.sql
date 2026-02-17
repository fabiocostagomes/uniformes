insert into public.schools (id, name, slug)
values ('11111111-1111-1111-1111-111111111111', 'Colegio Exemplo', 'colegio-exemplo')
on conflict (slug) do nothing;

insert into public.profiles (id, full_name, email, role)
values (
  '22222222-2222-2222-2222-222222222222',
  'Admin Inicial',
  'admin@colegio.exemplo',
  'admin'
)
on conflict (email) do nothing;

insert into public.school_memberships (id, school_id, profile_id, role)
values (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'admin'
)
on conflict (school_id, profile_id) do nothing;

insert into public.invite_codes (id, school_id, code, is_active, created_by)
values (
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'COLEGIO-ARRANQUE-2026',
  true,
  '22222222-2222-2222-2222-222222222222'
)
on conflict (code) do nothing;

