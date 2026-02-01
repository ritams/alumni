
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Alumni {
  id: string;
  name: string;
  graduation_year: number;
  thesis_title: string;
  current_position: string;
  organization: string;
  image?: string;
  profile_url?: string;
}

interface ProfessionalCardProps {
  alumnus: Alumni;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ alumnus }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-blue-400 transition-colors">
            <Image
              src={alumnus.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(alumnus.name)}&background=0D8ABC&color=fff`}
              alt={alumnus.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
              {alumnus.name}
            </h3>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Class of {alumnus.graduation_year}
            </p>
          </div>
        </div>
        {alumnus.profile_url && (
          <a
            href={alumnus.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-300">
          <Building2 size={16} className="text-blue-400" />
          <span className="text-sm font-medium">{alumnus.current_position}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={16} className="text-emerald-400" />
          <span className="text-sm">{alumnus.organization}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="text-xs text-gray-500 line-clamp-2 italic">
          "{alumnus.thesis_title}"
        </p>
      </div>

      {/* Decorative gradient glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 pointer-events-none transition-all duration-500" />
    </motion.div>
  );
};
