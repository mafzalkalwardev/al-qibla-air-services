-- Optional seed data for development (run after schema.sql)

-- Sample announcement
insert into public.announcements (message, priority, active)
values ('Ramadan Umrah packages now available — Book early for best seats!', 1, true)
on conflict do nothing;

-- Note: Full seed from mock data can be imported via admin or CSV.
-- Reviews and inquiries should be submitted through the public forms.
