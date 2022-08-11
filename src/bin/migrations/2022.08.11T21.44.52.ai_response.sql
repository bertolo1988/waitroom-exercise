CREATE TABLE ai_response (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  textHash text NOT NULL,
  openAiId text NOT NULL,
  title text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

