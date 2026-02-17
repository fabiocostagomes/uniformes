do $$
declare
  has_listings boolean;
  has_profiles boolean;
  listings_rls boolean;
  profiles_rls boolean;
begin
  select to_regclass('public.listings') is not null into has_listings;
  select to_regclass('public.profiles') is not null into has_profiles;

  if not has_listings then
    raise exception 'table public.listings does not exist';
  end if;

  if not has_profiles then
    raise exception 'table public.profiles does not exist';
  end if;

  select c.relrowsecurity
  into listings_rls
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'listings';

  select c.relrowsecurity
  into profiles_rls
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'profiles';

  if not listings_rls then
    raise exception 'RLS is not enabled on public.listings';
  end if;

  if not profiles_rls then
    raise exception 'RLS is not enabled on public.profiles';
  end if;
end $$;

