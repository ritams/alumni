'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AlumniCard } from '@/components/features/AlumniCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AlumniGridProps {
    alumni: any[];
}

export function AlumniGrid({ alumni }: AlumniGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Extract unique graduation years
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(alumni.map(a => a.graduation_year))).sort((a, b) => b - a);
        return uniqueYears;
    }, [alumni]);

    const filteredAlumni = useMemo(() => {
        return alumni.filter(alum => {
            const matchesSearch =
                alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alum.thesis_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alum.organization.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesYear = selectedYear === 'all' || alum.graduation_year.toString() === selectedYear;

            return matchesSearch && matchesYear;
        }).sort((a, b) => b.graduation_year - a.graduation_year);
    }, [alumni, searchTerm, selectedYear]);

    const groupedAlumni = useMemo(() => {
        const groups: { [key: number]: any[] } = {};

        filteredAlumni.forEach(alum => {
            if (!groups[alum.graduation_year]) {
                groups[alum.graduation_year] = [];
            }
            groups[alum.graduation_year].push(alum);
        });

        // Sort years descending
        return Object.keys(groups)
            .map(Number)
            .sort((a, b) => b - a)
            .map(year => ({
                year,
                alumni: groups[year]
            }));
    }, [filteredAlumni]);

    return (
        <div id="alumni-grid" className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-screen">

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-16">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-serif">Alumni Directory</h2>
                    <p className="text-muted-foreground mt-2 text-base md:text-lg">Browsing {filteredAlumni.length} profiles</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 bg-background border-border h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-full md:w-48 bg-background h-11">
                            <SelectValue placeholder="Graduation Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Years</SelectItem>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grid Grouped by Year */}
            {groupedAlumni.length > 0 ? (
                <div className="space-y-16 md:space-y-20">
                    {groupedAlumni.map((group) => (
                        <div key={group.year} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl md:text-2xl font-bold text-primary font-serif">Class of {group.year}</h3>
                                <div className="h-px bg-border flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {group.alumni.map((alum) => (
                                    <AlumniCard key={alum.id} alumnus={alum} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No alumni found matching your criteria.</p>
                    <Button
                        variant="link"
                        onClick={() => { setSearchTerm(''); setSelectedYear('all') }}
                        className="mt-2 text-primary"
                    >
                        Clear filters
                    </Button>
                </div>
            )}
        </div>
    );
}
