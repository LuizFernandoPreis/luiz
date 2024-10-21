'use server'
import HeroSection from "../_components/HeroSection";
import Feed from "../_components/feed";

export default async function Home() {
    return (
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <Feed />
      </main>
    );
  }
  