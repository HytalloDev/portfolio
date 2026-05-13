import { Star, GitFork, ExternalLink, Globe } from "lucide-react";
import type { GitHubRepo } from "@/types/github";
import { LANGUAGE_COLORS } from "@/lib/github";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  const langColor = repo.language
    ? LANGUAGE_COLORS[repo.language] ?? "#8b8b8b"
    : null;

  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-black/20">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-base font-semibold">
            {repo.name}
          </CardTitle>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Abrir ${repo.name} no GitHub`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {repo.description ?? "Sem descrição disponível."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
            {repo.topics.length > 4 && (
              <Badge variant="secondary" className="text-xs opacity-60">
                +{repo.topics.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {/* Language */}
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: langColor ?? "#8b8b8b" }}
              />
              {repo.language}
            </span>
          )}

          {/* Stars */}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {repo.stargazers_count}
            </span>
          )}

          {/* Forks */}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {repo.forks_count}
            </span>
          )}
        </div>

        {/* Homepage link */}
        {repo.homepage && (
          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <Globe className="h-3 w-3" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
