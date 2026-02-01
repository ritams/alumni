'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            name: 'Explore Profiles', href: '#alumni-grid', onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                document.getElementById('alumni-grid')?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="text-xl font-medium tracking-tight text-foreground">
                    IISER Pune Alumni
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={link.onClick}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Navigation - Removed as per request (redundant with hero button) */}
                <div className="md:hidden">
                    {/* Empty placeholder if needed, or just nothing */}
                </div>
            </div>
        </nav>
    );
}
