--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.sets DROP CONSTRAINT IF EXISTS sets_fk0;
ALTER TABLE IF EXISTS ONLY public.sets DROP CONSTRAINT IF EXISTS sets_pk;
ALTER TABLE IF EXISTS ONLY public.artists DROP CONSTRAINT IF EXISTS artists_pk;
ALTER TABLE IF EXISTS public.sets ALTER COLUMN "setId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.artists ALTER COLUMN "artistId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."sets_setId_seq";
DROP TABLE IF EXISTS public.sets;
DROP SEQUENCE IF EXISTS public."artists_artistId_seq";
DROP TABLE IF EXISTS public.artists;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.artists (
    "artistId" integer NOT NULL,
    "artistName" text NOT NULL,
    image text NOT NULL
);


--
-- Name: artists_artistId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."artists_artistId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: artists_artistId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."artists_artistId_seq" OWNED BY public.artists."artistId";


--
-- Name: sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sets (
    "setId" integer NOT NULL,
    "setName" text NOT NULL,
    "artistId" integer NOT NULL,
    osc1 boolean NOT NULL,
    "waveForm1" text NOT NULL,
    frq1 integer NOT NULL,
    lp1 boolean NOT NULL,
    hp1 boolean NOT NULL,
    delay1 boolean NOT NULL,
    reverb1 boolean NOT NULL,
    distortion1 boolean NOT NULL,
    gain1 integer NOT NULL,
    osc2 boolean NOT NULL,
    "waveForm2" text NOT NULL,
    frq2 integer NOT NULL,
    lp2 boolean NOT NULL,
    hp2 boolean NOT NULL,
    delay2 boolean NOT NULL,
    reverb2 boolean NOT NULL,
    distortion2 boolean NOT NULL,
    gain2 integer NOT NULL,
    output integer NOT NULL
);


--
-- Name: sets_setId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."sets_setId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sets_setId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."sets_setId_seq" OWNED BY public.sets."setId";


--
-- Name: artists artistId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists ALTER COLUMN "artistId" SET DEFAULT nextval('public."artists_artistId_seq"'::regclass);


--
-- Name: sets setId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sets ALTER COLUMN "setId" SET DEFAULT nextval('public."sets_setId_seq"'::regclass);


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.artists ("artistId", "artistName", image) FROM stdin;
1	Ashkan	./images/avatar/ashkan.png
\.


--
-- Data for Name: sets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sets ("setId", "setName", "artistId", osc1, "waveForm1", frq1, lp1, hp1, delay1, reverb1, distortion1, gain1, osc2, "waveForm2", frq2, lp2, hp2, delay2, reverb2, distortion2, gain2, output) FROM stdin;
1	Mynoise	1	t	sine	440	t	t	t	t	t	10	t	sine	440	f	f	f	f	f	5	5
\.


--
-- Name: artists_artistId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."artists_artistId_seq"', 1, true);


--
-- Name: sets_setId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."sets_setId_seq"', 1, true);


--
-- Name: artists artists_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pk PRIMARY KEY ("artistId");


--
-- Name: sets sets_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pk PRIMARY KEY ("setId");


--
-- Name: sets sets_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_fk0 FOREIGN KEY ("artistId") REFERENCES public.artists("artistId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

