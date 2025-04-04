--
-- PostgreSQL database dump
--

-- Dumped from database version 15.9 (Homebrew)
-- Dumped by pg_dump version 15.9 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255),
    "position" character varying(255),
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    short_name character varying(255) NOT NULL,
    long_name character varying(255) NOT NULL,
    west_bound_longitude character varying(255),
    east_bound_longitude character varying(255),
    south_bound_latitude character varying(255),
    north_bound_latitude character varying(255),
    crs character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: data_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_types (
    id integer NOT NULL,
    datatype_code character varying(255) NOT NULL,
    datatype_name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.data_types OWNER TO postgres;

--
-- Name: data_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.data_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_types_id_seq OWNER TO postgres;

--
-- Name: data_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.data_types_id_seq OWNED BY public.data_types.id;


--
-- Name: keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keywords (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.keywords OWNER TO postgres;

--
-- Name: keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.keywords_id_seq OWNER TO postgres;

--
-- Name: keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.keywords_id_seq OWNED BY public.keywords.id;


--
-- Name: metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metadata (
    id integer NOT NULL,
    title character varying(255),
    abstract character varying(255),
    data_type_id integer NOT NULL,
    comment character varying(255),
    temporal_coverage_from timestamp with time zone,
    temporal_coverage_to timestamp with time zone,
    language character varying(255) DEFAULT 'en'::character varying,
    version character varying(255),
    project_id integer,
    west_bounding_box double precision,
    east_bounding_box double precision,
    south_bounding_box double precision,
    north_bounding_box double precision,
    coordinate_reference_system character varying(255),
    contact_id integer,
    publisher_id integer,
    created_by integer,
    country_id character varying(255),
    access_constraint character varying(255),
    license character varying(255),
    acknowledgement character varying(255),
    history character varying(255),
    funding character varying(255),
    "references" character varying(255),
    is_restricted boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.metadata OWNER TO postgres;

--
-- Name: metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metadata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metadata_id_seq OWNER TO postgres;

--
-- Name: metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metadata_id_seq OWNED BY public.metadata.id;


--
-- Name: metadata_keyword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metadata_keyword (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    keyword_id integer NOT NULL,
    metadata_id integer NOT NULL
);


ALTER TABLE public.metadata_keyword OWNER TO postgres;

--
-- Name: metadata_topic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metadata_topic (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    topic_id integer NOT NULL,
    metadata_id integer NOT NULL
);


ALTER TABLE public.metadata_topic OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    project_code character varying(255) NOT NULL,
    project_name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: publishers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publishers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    website character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.publishers OWNER TO postgres;

--
-- Name: publishers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publishers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publishers_id_seq OWNER TO postgres;

--
-- Name: publishers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publishers_id_seq OWNED BY public.publishers.id;


--
-- Name: refreshTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."refreshTokens" (
    id integer NOT NULL,
    token character varying(255),
    "expiryDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."refreshTokens" OWNER TO postgres;

--
-- Name: refreshTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."refreshTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."refreshTokens_id_seq" OWNER TO postgres;

--
-- Name: refreshTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."refreshTokens_id_seq" OWNED BY public."refreshTokens".id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password character varying(255),
    country_id character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: data_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_types ALTER COLUMN id SET DEFAULT nextval('public.data_types_id_seq'::regclass);


--
-- Name: keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords ALTER COLUMN id SET DEFAULT nextval('public.keywords_id_seq'::regclass);


--
-- Name: metadata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata ALTER COLUMN id SET DEFAULT nextval('public.metadata_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: publishers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers ALTER COLUMN id SET DEFAULT nextval('public.publishers_id_seq'::regclass);


--
-- Name: refreshTokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens" ALTER COLUMN id SET DEFAULT nextval('public."refreshTokens_id_seq"'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, first_name, last_name, "position", email, "createdAt", "updatedAt") FROM stdin;
1	Divesh	Anuj	SD	divesha@spc.int	2025-04-04 09:53:48.123+12	2025-04-04 09:53:48.123+12
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (short_name, long_name, west_bound_longitude, east_bound_longitude, south_bound_latitude, north_bound_latitude, crs, "createdAt", "updatedAt") FROM stdin;
TV	Tuvalu	\N	\N	\N	\N	\N	2025-04-04 09:30:43.405+12	2025-04-04 09:30:43.405+12
\.


--
-- Data for Name: data_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_types (id, datatype_code, datatype_name, "createdAt", "updatedAt") FROM stdin;
1	Raster	Raster	2025-04-04 09:45:23.831+12	2025-04-04 09:45:23.831+12
\.


--
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keywords (id, name, "createdAt", "updatedAt") FROM stdin;
1	Ocean	2025-04-04 11:38:30.209+12	2025-04-04 11:38:30.209+12
\.


--
-- Data for Name: metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metadata (id, title, abstract, data_type_id, comment, temporal_coverage_from, temporal_coverage_to, language, version, project_id, west_bounding_box, east_bounding_box, south_bounding_box, north_bounding_box, coordinate_reference_system, contact_id, publisher_id, created_by, country_id, access_constraint, license, acknowledgement, history, funding, "references", is_restricted, "createdAt", "updatedAt") FROM stdin;
6	Climate Data for East Africa 2020-2023	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 12:55:07.286+12	2025-04-04 12:55:07.286+12
7	Climate Data for East Africa 2020-2023	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 12:55:31.09+12	2025-04-04 12:55:31.09+12
8	Climate Data for East Africa 2020-2023	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 12:57:27.411+12	2025-04-04 12:57:27.411+12
9	Climate Data for East Africa 2020-202322	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 12:58:24.663+12	2025-04-04 12:58:24.663+12
10	Climate Data for East Africa 2020-202322	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 13:00:35.006+12	2025-04-04 13:00:35.006+12
12	Climate Data for East Africa 2020-202322	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 13:30:15.931+12	2025-04-04 13:30:15.931+12
11	Updated Title	Monthly climate data including temperature and precipitation for East African countries	1	Preliminary data, subject to revision	2020-01-01 13:00:00+13	2023-12-31 12:00:00+12	en	v1.2	1	29	42	-12	5	EPSG:4326	1	1	1	TV	None	CC BY 4.0	Data collected with support from UNDP	v1.0 - Initial release; v1.1 - Added precipitation data; v1.2 - Quality control updates	UNDP Climate Resilience Program	UNDP Climate Report 2023	f	2025-04-04 13:29:59.849+12	2025-04-04 13:54:24.402+12
\.


--
-- Data for Name: metadata_keyword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metadata_keyword ("createdAt", "updatedAt", keyword_id, metadata_id) FROM stdin;
2025-04-04 13:00:35.035+12	2025-04-04 13:00:35.035+12	10	1
2025-04-04 13:29:59.865+12	2025-04-04 13:29:59.865+12	11	1
2025-04-04 13:30:15.954+12	2025-04-04 13:30:15.954+12	12	1
\.


--
-- Data for Name: metadata_topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metadata_topic ("createdAt", "updatedAt", topic_id, metadata_id) FROM stdin;
2025-04-04 13:00:35.028+12	2025-04-04 13:00:35.028+12	1	10
2025-04-04 13:29:59.863+12	2025-04-04 13:29:59.863+12	1	11
2025-04-04 13:30:15.949+12	2025-04-04 13:30:15.949+12	1	12
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, project_code, project_name, "createdAt", "updatedAt") FROM stdin;
1	TCAP	Tuvalu Coastal Adaptation Project	2025-04-04 09:49:36.519+12	2025-04-04 09:49:36.519+12
\.


--
-- Data for Name: publishers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publishers (id, name, website, "createdAt", "updatedAt") FROM stdin;
1	Tuvalu Meteorological Office	www.tms.gov.tv	2025-04-04 11:08:20.221+12	2025-04-04 11:08:20.221+12
\.


--
-- Data for Name: refreshTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."refreshTokens" (id, token, "expiryDate", "createdAt", "updatedAt", "userId") FROM stdin;
1	6e11cc2d-da3e-45da-af02-1d9c358b2d74	2025-04-04 10:21:05.711+12	2025-04-04 09:31:05.711+12	2025-04-04 09:31:05.711+12	1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
1	user	2025-04-04 09:30:43.404+12	2025-04-04 09:30:43.404+12
3	registered	2025-04-04 09:30:43.405+12	2025-04-04 09:30:43.405+12
2	admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im	2025-04-04 09:30:43.405+12	2025-04-04 09:30:43.405+12
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, name, "createdAt", "updatedAt") FROM stdin;
1	Climate	2025-04-04 12:04:03.715+12	2025-04-04 12:04:03.715+12
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles ("createdAt", "updatedAt", "roleId", "userId") FROM stdin;
2025-04-04 09:31:02.348+12	2025-04-04 09:31:02.348+12	2	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, country_id, "createdAt", "updatedAt") FROM stdin;
1	Divesh	Anuj	divesha@spc.int	$2b$08$p4uyyvDZNnd8CuCCR5jy8OPxD0cl67vR9XJsB6rJ9gxMvsjEYfNM2	TV	2025-04-04 09:31:02.326+12	2025-04-04 09:31:02.326+12
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, true);


--
-- Name: data_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_types_id_seq', 1, true);


--
-- Name: keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.keywords_id_seq', 1, true);


--
-- Name: metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metadata_id_seq', 12, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 1, true);


--
-- Name: publishers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publishers_id_seq', 1, true);


--
-- Name: refreshTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."refreshTokens_id_seq"', 1, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (short_name);


--
-- Name: data_types data_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_types
    ADD CONSTRAINT data_types_pkey PRIMARY KEY (id);


--
-- Name: keywords keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_pkey PRIMARY KEY (id);


--
-- Name: metadata_keyword metadata_keyword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_keyword
    ADD CONSTRAINT metadata_keyword_pkey PRIMARY KEY (keyword_id, metadata_id);


--
-- Name: metadata metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (id);


--
-- Name: metadata_topic metadata_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_topic
    ADD CONSTRAINT metadata_topic_pkey PRIMARY KEY (topic_id, metadata_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (id);


--
-- Name: refreshTokens refreshTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_pkey" PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY ("roleId", "userId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: metadata metadata_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata metadata_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(short_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata metadata_data_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_data_type_id_fkey FOREIGN KEY (data_type_id) REFERENCES public.data_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata_keyword metadata_keyword_keyword_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_keyword
    ADD CONSTRAINT metadata_keyword_keyword_id_fkey FOREIGN KEY (keyword_id) REFERENCES public.metadata(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata_keyword metadata_keyword_metadata_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_keyword
    ADD CONSTRAINT metadata_keyword_metadata_id_fkey FOREIGN KEY (metadata_id) REFERENCES public.keywords(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata metadata_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata metadata_publisher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publishers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata_topic metadata_topic_metadata_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_topic
    ADD CONSTRAINT metadata_topic_metadata_id_fkey FOREIGN KEY (metadata_id) REFERENCES public.metadata(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: metadata_topic metadata_topic_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata_topic
    ADD CONSTRAINT metadata_topic_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refreshTokens refreshTokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."refreshTokens"
    ADD CONSTRAINT "refreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_roles user_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(short_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

