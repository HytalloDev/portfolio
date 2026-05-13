"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { GitHubRepo } from "@/types/github";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const languages = useMemo(() => {
    const langs = repos
      .map((r) => r.language)
      .filter((l): l is string => l !== null);
    return Array.from(new Set(langs)).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        search === "" ||
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.description?.toLowerCase().includes(search.toLowerCase()) ||
        repo.topics.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchesLang =
        selectedLang === null || repo.language === selectedLang;
      return matchesSearch && matchesLang;
    });
  }, [repos, search, selectedLang]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Projetos
        </h2>
        <p className="text-muted-foreground">
          {repos.length} repositórios públicos no GitHub
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          />
        </div>

        {/* Language filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLang(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              selectedLang === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            Todos
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() =>
                setSelectedLang(lang === selectedLang ? null : lang)
              }
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                selectedLang === lang
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Nenhum projeto encontrado
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            Tente uma busca diferente
          </p>
        </div>
      )}

      {/* Count */}
      {filtered.length > 0 && filtered.length !== repos.length && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Mostrando {filtered.length} de {repos.length} projetos
        </p>
      )}
    </section>
  );
}
