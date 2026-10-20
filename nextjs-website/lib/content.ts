// Unico punto di accesso ai contenuti: in Phase 8 cambia solo questo file (query Sanity).
import { site } from "@/content/site";
import { home } from "@/content/home";
import { about } from "@/content/about";
import { rooms } from "@/content/rooms";
import { suites } from "@/content/suites";
import { articles, categories, journal } from "@/content/articles";
import { contact } from "@/content/contact";

export const getSite = async () => site;
export const getHome = async () => home;
export const getAbout = async () => about;
export const getRooms = async () => rooms;
export const getSuites = async () => suites;
export const getSuite = async (slug: string) => suites.find((s) => s.slug === slug);
export const getJournal = async () => journal;
export const getCategories = async () => categories;
export const getArticles = async () => articles;
export const getArticle = async (slug: string) => articles.find((a) => a.slug === slug && a.body);
export const getContact = async () => contact;
