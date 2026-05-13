import { Suspense } from "react";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const [user, repos] = await Promise.all([
    getGitHubUser(),
    getGitHubRepos(),
  ]);

  return (
    <>
      <Hero user={user} />
      <Projects repos={repos} />
      <Contact user={user} />
    </>
  );
}
