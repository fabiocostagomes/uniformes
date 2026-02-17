alter table public.profiles enable row level security;
alter table public.school_memberships enable row level security;
alter table public.invite_codes enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.reports enable row level security;
alter table public.schools enable row level security;

create policy "profiles_select_self"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_update_self"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_insert_self"
on public.profiles for insert
with check (auth.uid() = id);

create policy "schools_select_for_members"
on public.schools for select
using (
  exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = schools.id
      and sm.profile_id = auth.uid()
  )
);

create policy "memberships_select_self"
on public.school_memberships for select
using (profile_id = auth.uid());

create policy "invite_codes_select_authenticated"
on public.invite_codes for select
using (auth.role() = 'authenticated' and is_active = true);

create policy "invite_codes_manage_admin"
on public.invite_codes for all
using (
  exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = invite_codes.school_id
      and sm.profile_id = auth.uid()
      and sm.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = invite_codes.school_id
      and sm.profile_id = auth.uid()
      and sm.role = 'admin'
  )
);

create policy "listings_select_school_members"
on public.listings for select
using (
  exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = listings.school_id
      and sm.profile_id = auth.uid()
  )
);

create policy "listings_insert_owner_if_member"
on public.listings for insert
with check (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = listings.school_id
      and sm.profile_id = auth.uid()
  )
);

create policy "listings_update_owner_or_admin"
on public.listings for update
using (
  owner_id = auth.uid()
  or exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = listings.school_id
      and sm.profile_id = auth.uid()
      and sm.role = 'admin'
  )
)
with check (
  owner_id = auth.uid()
  or exists (
    select 1
    from public.school_memberships sm
    where sm.school_id = listings.school_id
      and sm.profile_id = auth.uid()
      and sm.role = 'admin'
  )
);

create policy "listing_images_select_member_visible_listing"
on public.listing_images for select
using (
  exists (
    select 1
    from public.listings l
    join public.school_memberships sm on sm.school_id = l.school_id
    where l.id = listing_images.listing_id
      and sm.profile_id = auth.uid()
  )
);

create policy "listing_images_insert_owner"
on public.listing_images for insert
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.owner_id = auth.uid()
  )
);

create policy "reports_insert_member"
on public.reports for insert
with check (
  reporter_id = auth.uid()
  and exists (
    select 1
    from public.listings l
    join public.school_memberships sm on sm.school_id = l.school_id
    where l.id = reports.listing_id
      and sm.profile_id = auth.uid()
  )
);

create policy "reports_select_admin"
on public.reports for select
using (
  exists (
    select 1
    from public.listings l
    join public.school_memberships sm on sm.school_id = l.school_id
    where l.id = reports.listing_id
      and sm.profile_id = auth.uid()
      and sm.role = 'admin'
  )
);

