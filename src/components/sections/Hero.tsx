import Image from "next/image";
import { Github, MapPin, Users, BookOpen, ExternalLink } from "lucide-react";
import type { GitHubUser } from "@/types/github";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  user: GitHubUser;
}

export function Hero({ user }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Avatar */}
        <div className="mb-6 ring-4 ring-border ring-offset-4 ring-offset-background rounded-full">
          <Image
            src={user.avatar_url}
            alt={user.name ?? user.login}
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
        </div>

        {/* Name */}
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {user.name ?? user.login}
        </h1>

        {/* Username badge */}
        <Badge variant="secondary" className="mb-6 font-mono text-xs">
          @{user.login}
        </Badge>

        {/* Bio */}
        {user.bio && (
          <p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
            {user.bio}
          </p>
        )}

        {/* Meta */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          {user.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {user.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {user.followers} seguidores
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {user.public_repos} repositórios
          </span>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a href="#projects">Ver Projetos</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/HytalloDev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-border flex items-start justify-center pt-1">
          <div className="h-1.5 w-1 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
