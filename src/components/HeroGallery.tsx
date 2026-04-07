"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Page = "home" | "content" | "websites" | "apps" | "about";

interface Project {
  id: string;
  title: string;
  description: string;
  type: "video" | "website" | "app";
  link?: string;
  videoId?: string;
  image: string;
  details: string[];
}

const contentProjects: Project[] = [
  { id: "c1", title: "Vice Reel", description: "Motion graphics package for Vice media campaign", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80&auto=format&fit=crop", details: ["30-second reel with kinetic typography and brand-matched color grading", "Motion graphics + text animation delivered in 3 aspect ratios for Stories, Reels, and feed"] },
  { id: "c2", title: "Brand Launch", description: "Social media launch campaign with 5 deliverables", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80&auto=format&fit=crop", details: ["5 videos ranging 15–60 seconds across Instagram, LinkedIn, and TikTok", "Full asset sourcing including stock footage, SFX, and licensed music"] },
  { id: "c3", title: "Product Promo", description: "E-commerce product showcase for Instagram", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop", details: ["Product reveal animation with 3D-style motion and smooth transitions", "Optimized for Reels and Stories with client-provided product photography"] },
  { id: "c4", title: "Event Recap", description: "Highlight reel from live brand activation", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop", details: ["60-second recap cut from on-site footage with SFX and music sourcing", "Same-day turnaround for social posting while the event was still trending"] },
  { id: "c5", title: "Tutorial Series", description: "Educational content for LinkedIn audience", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&auto=format&fit=crop", details: ["3-part animated series with text overlays, voiceover sync, and branded lower thirds", "LinkedIn-optimized vertical and square formats with captions baked in"] },
  { id: "c6", title: "App Walkthrough", description: "UI walkthrough animation for app launch", type: "video", videoId: "K0roS-q_vR4", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80&auto=format&fit=crop", details: ["Screen recording composited with device mockup frames and smooth transitions", "30-second App Store preview video with motion callouts on key features"] },
];

const appProjects: Project[] = [
  { id: "a1", title: "Tabli", description: "Guitar tablature app with real-time playback", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop", details: ["Built with React Native and Expo featuring a custom audio engine for real-time tab playback", "Offline-first architecture with local storage sync and Apple Music integration"] },
  { id: "a2", title: "CruLink", description: "B2B platform connecting fabricators with customers", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80&auto=format&fit=crop", details: ["Full-stack platform on Next.js and Supabase with Stripe Connect for split payments", "Real-time messaging, order tracking, and multi-tenant architecture for fabrication businesses"] },
  { id: "a3", title: "Inventory Tracker", description: "Warehouse management for small manufacturers", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format&fit=crop", details: ["Cross-platform iOS and Android app with barcode scanning and real-time cloud sync", "Built for warehouse floor use with large touch targets and offline-capable data entry"] },
  { id: "a4", title: "Fitness Logger", description: "Minimal workout tracking with Apple Health sync", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=80&auto=format&fit=crop", details: ["Native Swift and SwiftUI app with deep HealthKit integration and home screen widgets", "Minimalist interface focused on fast logging with automatic set detection"] },
  { id: "a5", title: "Recipe Box", description: "Personal recipe manager with meal planning", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80&auto=format&fit=crop", details: ["React Native app with OCR-powered recipe import from photos and websites", "Meal planning calendar with automatic shopping list generation and pantry tracking"] },
  { id: "a6", title: "Field Notes", description: "Location-tagged note-taking for field workers", type: "app", link: "https://apps.apple.com", image: "https://images.unsplash.com/photo-1632406898-3cae5196bced?w=600&q=80&auto=format&fit=crop", details: ["Expo app with integrated maps for GPS-tagged notes and photo annotations", "Fully offline-capable with background sync when connectivity returns"] },
];

const websiteProjects: Project[] = [
  { id: "w1", title: "Spandrel Studio", description: "Custom fabrication business site with quote system", type: "website", link: "https://spandrel.com", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop", details: ["Next.js and Tailwind site with a custom multi-step quote builder for fabrication projects", "CMS-powered content management with real-time quote notifications and admin dashboard"] },
  { id: "w2", title: "Architect Portfolio", description: "Minimal portfolio with project case studies", type: "website", link: "https://example.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80&auto=format&fit=crop", details: ["Single-page design with scroll-driven parallax animations and full-bleed imagery", "Mobile-first responsive layout with lazy-loaded high-res project photography"] },
  { id: "w3", title: "E-Commerce Store", description: "Full custom storefront with Stripe checkout", type: "website", link: "https://example.com", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80&auto=format&fit=crop", details: ["Headless Shopify storefront with custom cart, filtering, and Stripe-powered checkout", "Performance optimized with edge caching, image CDN, and sub-2-second page loads"] },
  { id: "w4", title: "SaaS Landing Page", description: "High-converting landing page for B2B product", type: "website", link: "https://example.com", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop", details: ["A/B tested layout with analytics integration, heatmap tracking, and conversion funnels", "Built for speed with static generation, edge functions, and optimized Core Web Vitals"] },
  { id: "w5", title: "Restaurant Site", description: "Menu-driven site with reservation system", type: "website", link: "https://example.com", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop", details: ["Menu-driven design with online ordering integration and OpenTable reservation widget", "SEO-optimized with local schema markup, responsive design, and Google Maps embed"] },
  { id: "w6", title: "Agency Rebrand", description: "Complete digital rebrand for creative agency", type: "website", link: "https://example.com", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80&auto=format&fit=crop", details: ["5-page site with full brand system implementation including typography, color, and motion", "CMS-powered blog with category filtering, social sharing, and newsletter integration"] },
];

interface HeroGalleryProps {
  activePage: Page;
  onContactClick: (subject?: string) => void;
}

export default function HeroGallery({ activePage, onContactClick }: HeroGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const stagger = (index: number) => index * 0.07;

  return (
    <section id="home" className="pt-[84px] md:pt-14">
      <div className="px-4">
        {/* Page content */}
        <AnimatePresence mode="wait">
          {/* ── Home: hero video ── */}
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 pb-0"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[2.2/1] bg-black rounded-lg overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/K0roS-q_vR4?autoplay=1&mute=1&loop=1&playlist=K0roS-q_vR4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
                    className="absolute top-1/2 left-1/2 w-[300%] md:w-[180%] h-[300%] md:h-[180%]"
                    style={{ border: "none", transform: "translate(-50%, -50%)" }}
                    allow="autoplay; encrypted-media"
                    title="Showreel"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
                    I make brands move,
                    <br />
                    <span className="font-normal">websites convert,</span>
                    <br />
                    and apps work.
                  </h2>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Content: portrait gallery ── */}
          {activePage === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {contentProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-[3/4] bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Websites: landscape gallery ── */}
          {activePage === "websites" && (
            <motion.div
              key="websites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {websiteProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-[16/10] bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Apps: portrait gallery ── */}
          {activePage === "apps" && (
            <motion.div
              key="apps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-4"
                          >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {appProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: stagger(i), ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group text-left w-full"
                    >
                      <div className="relative aspect-square bg-[#f0f0f0] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <p className="absolute bottom-4 left-4 text-[12px] text-white/80 font-medium">
                          {project.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── About ── */}
          {activePage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 pb-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="relative bg-[#f0f0f0] rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[calc((100vw-32px)/2.2)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop')",
                    }}
                  />
                </div>
                <div className="flex flex-col justify-end py-4 lg:pl-6">
                  <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground mb-8">
                    Leonardo
                    <br />
                    Pham
                  </h2>
                  <p className="text-[14px] leading-relaxed text-muted mb-3 max-w-[420px]">
                    Creative developer based in Southern California. I help
                    businesses cut through the noise with social media content,
                    high-converting websites, and software that actually works.
                  </p>
                  <p className="text-[14px] leading-relaxed text-muted/60 mb-8 max-w-[420px]">
                    Every project starts with understanding what you need — not
                    what looks good in a portfolio. Clean execution, honest
                    timelines, real results.
                  </p>
                  <button
                    onClick={() => onContactClick("Contact")}
                    className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity self-start"
                  >
                    Get in touch →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[90] flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white w-full max-w-[640px] rounded-lg overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>

                {/* Hero media */}
                {selectedProject.type === "video" && selectedProject.videoId ? (
                  /* Video: autoplay with sound */
                  <div className="relative w-full aspect-[9/16] max-h-[70vh] bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&loop=1&playlist=${selectedProject.videoId}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                      className="w-full h-full"
                      style={{ border: "none" }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={selectedProject.title}
                    />
                  </div>
                ) : (
                  /* Website/App: clickable placeholder */
                  <button
                    onClick={() => {
                      if (selectedProject.link) {
                        window.open(selectedProject.link, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className={`relative w-full bg-[#f0f0f0] ${selectedProject.type === "app" ? "aspect-square" : "aspect-[16/10]"} cursor-pointer group`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedProject.image}')` }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-14 h-14 rounded-full bg-foreground/80 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5">
                          <path d="M1 15L15 1M15 1H5M15 1v10" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title + action link on same row */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-[20px] font-medium tracking-[-0.01em] text-foreground">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <p className="text-[14px] text-muted">
                      {selectedProject.description}
                    </p>
                    {selectedProject.type === "video" && selectedProject.videoId && (
                      <a
                        href={`https://youtube.com/watch?v=${selectedProject.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity whitespace-nowrap"
                      >
                        YouTube →
                      </a>
                    )}
                    {selectedProject.type === "website" && selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity whitespace-nowrap"
                      >
                        Visit site →
                      </a>
                    )}
                  </div>

                  {/* Details */}
                  <div className="border-t border-border pt-5">
                    <p className="text-[13px] text-muted leading-relaxed">
                      {selectedProject.details.join(". ")}.
                    </p>
                  </div>

                  {/* Screenshots */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-[#f0f0f0] rounded-md aspect-[4/3]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
