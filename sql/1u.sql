CREATE extension IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.users (
  id bigserial PRIMARY KEY,
  username citext UNIQUE NOT NULL,
  password text,
  avatar text,
  is_admin boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE if NOT EXISTS public.posts (
  id bigserial primary key,
  user_id bigint REFERENCES public.users (id),
  content text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.follows (
  user_id bigint not null REFERENCES public.users (id),
  follower_id bigint not null REFERENCES public.users (id),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(user_id, follower_id)
);

CREATE INDEX posts_user_id_index on public.posts (user_id);
CREATE INDEX follows_user_id_index on public.follows (user_id);
CREATE INDEX follows_follower_id_index on public.follows (follower_id);
