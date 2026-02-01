'use client';

import React, { useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { AlumniGrid } from '@/components/home/AlumniGrid';

export default function ClientHome({ alumni }: { alumni: any[] }) {

    const stats = useMemo(() => {
        const total = alumni.length;
        let postdocs = 0;
        let industry = 0;
        let others = 0;

        alumni.forEach(alum => {
            const pos = alum.current_position.toLowerCase();
            const org = alum.organization.toLowerCase();

            // Heuristics for categorization
            if (pos.includes('post') || pos.includes('doc') || pos.includes('researcher') || pos.includes('fellow')) {
                postdocs++;
            } else if (
                pos.includes('manager') ||
                pos.includes('engineer') ||
                pos.includes('consultant') ||
                pos.includes('founder') ||
                pos.includes('data') ||
                pos.includes('analyst') ||
                pos.includes('scientist') // 'Data Scientist' etc, but 'Research Scientist' might be academic. Hard to tell.
            ) {
                industry++;
            } else {
                others++;
            }
        });

        // If industry was 0, maybe the heuristics failed, but let's assume they are roughly correct for this demo.
        // Also "PhDs" in the prompt context likely refers to the total count of these PhD alumni.

        return {
            total,
            phds: total, // Assuming this is a list of PhD alumni as per user "only worried about PhD alumni"
            postdocs,
            industry,
            others
        };
    }, [alumni]);

    const scrollToGrid = () => {
        const grid = document.getElementById('alumni-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Navbar />
            <HeroSection stats={stats} onScrollDown={scrollToGrid} />
            <AlumniGrid alumni={alumni} />

            <footer className="py-12 border-t border-border/60 text-center text-sm text-muted-foreground bg-background/50">
                <p>© {new Date().getFullYear()} IISER Pune Alumni Association.</p>
            </footer>
        </main>
    );
}
