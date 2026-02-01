import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, User } from 'lucide-react';

interface Alumnus {
    id: string;
    name: string;
    graduation_year: number;
    thesis_title: string;
    current_position: string;
    organization: string;
    image: string;
    profile_url?: string;
}

interface AlumniCardProps {
    alumnus: Alumnus;
}

export function AlumniCard({ alumnus }: AlumniCardProps) {
    const initials = alumnus.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    const basePath = '/alumni';
    const imagePath = alumnus.image && alumnus.image.trim() !== ''
        ? `${basePath}${alumnus.image}`
        : `${basePath}/images/alumni/${alumnus.name}.jpg`;

    const hasCurrentRole = alumnus.current_position && alumnus.current_position.trim() !== '';
    const hasOrg = alumnus.organization && alumnus.organization.trim() !== '';

    return (
        <Card className="group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden flex flex-col h-full rounded-xl">
            <div className="p-5 flex gap-5 items-start">
                <Avatar className="h-20 w-20 rounded-lg border border-border/50 shadow-sm shrink-0">
                    <AvatarImage src={imagePath} alt={alumnus.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl rounded-lg">{initials}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex flex-col pt-0.5">
                    <h3 className="text-lg font-bold text-foreground leading-snug break-words">
                        {alumnus.name}
                    </h3>

                    {hasCurrentRole && (
                        <div className="mt-2 inline-flex">
                            <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-md uppercase tracking-wide">
                                {alumnus.current_position}
                            </span>
                        </div>
                    )}

                    {hasOrg && (
                        <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
                            {alumnus.organization}
                        </p>
                    )}
                </div>
            </div>

            <CardContent className="flex flex-col flex-1 px-5 pb-5 pt-0 gap-4">
                <div className="flex-1">
                    <div className="py-2">
                        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest block mb-1.5">
                            Thesis Title
                        </span>
                        <p className="text-sm text-foreground/90 italic leading-relaxed text-wrap">
                            {alumnus.thesis_title}
                        </p>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-3 flex justify-end">
                    {alumnus.profile_url && (
                        <a
                            href={alumnus.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group/link"
                        >
                            View Profile
                            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
