'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroStats {
    total: number;
    phds: number;
    postdocs: number;
    industry: number;
    others: number;
}

interface HeroSectionProps {
    stats: HeroStats;
    onScrollDown: () => void;
}

export function HeroSection({ stats, onScrollDown }: HeroSectionProps) {
    return (
        <section className="relative px-6 min-h-screen flex flex-col justify-center bg-background overflow-hidden pt-24 lg:pt-0">

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="lg:col-span-7 space-y-10">
                    <h1 className="text-7xl lg:text-[7rem] font-bold tracking-tight text-foreground leading-[1] font-serif">
                        Beyond the <br />
                        <span className="text-primary">Thesis.</span>
                    </h1>

                    <p className="text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed font-light">
                        A showcase of the diverse professional pathways taken by IISER Pune PhD graduates. Discover where they are making an impact today.
                    </p>

                    <div className="pt-6">
                        <Button
                            onClick={onScrollDown}
                            className="h-14 px-10 text-lg font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Explore Profiles
                        </Button>
                    </div>
                </div>

                {/* Right: Stats Panel - Spans 5 cols - Elegant vertical list or minimal grid */}
                <div className="lg:col-span-5 relative">
                    {/* Decorative background element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-main-gradient opacity-20 blur-3xl -z-10 rounded-full"></div>

                    <div className="flex flex-col gap-8 lg:pl-12 border-l border-border/40">
                        <div className="inline-flex items-center mb-6">
                            <span className="text-xs font-light text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-primary/10">
                                2024-25
                            </span>
                        </div>

                        <StatRow label="Graduates" value={stats.total} />
                        <StatRow label="In Research (Postdoc)" value={stats.postdocs} />
                        <StatRow label="In Industry" value={stats.industry} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatRow({ label, value }: { label: string, value: number | string }) {
    return (
        <div className="group flex items-center justify-between gap-4 pr-4">
            <span className="text-base font-medium text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                {label}
            </span>
            <span className="text-6xl font-serif text-foreground font-medium group-hover:scale-110 origin-right transition-transform duration-500 ease-out">
                {value}
            </span>
        </div>
    );
}
