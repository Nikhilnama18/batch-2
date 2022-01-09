---DROP Table if exists
DROP TABLE public.users 

--- Create mew users table ---
CREATE  TABLE public.users (
	u_id serial not NULL unique,
	id integer not null unique,
	u_name varchar,
	u_email varchar,
	u_password varchar
);

---Drop food_items table if exists---
DROP TABLE food_items

---Create new food_items table---
create  table public.food_items 
(
id serial NOT null unique,
foodId integer NOT NULL unique,
foodName varchar,
foodCost integer,
foodType varchar
);