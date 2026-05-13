import { Github, Mail, ExternalLink } from "lucide-react";
import type { GitHubUser } from "@/types/github";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ContactProps {
  user: GitHubUser;
}

export function Contact({ user }: ContactProps) {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mb-10 text-muted-foreground">
            Aberto a novas oportunidades e colaborações. Sinta-se à vontade para
            entrar em contato!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
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

            {user.blog && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Website
                </a>
              </Button>
            )}

            {user.twitter_username && (
              <Button variant="outline" size="lg" asChild>
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />@{user.twitter_username}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
