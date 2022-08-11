CREATE TABLE ai_response (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text_hash text NOT NULL,
  openai_id text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

