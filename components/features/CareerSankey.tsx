
'use client';

import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

const data = {
    nodes: [
        { id: "Physics Major", nodeColor: "#3b82f6" },
        { id: "Chemistry Major", nodeColor: "#10b981" },
        { id: "Biology Major", nodeColor: "#f59e0b" },
        { id: "Math Major", nodeColor: "#8b5cf6" },

        { id: "PhD (US)", nodeColor: "#6366f1" },
        { id: "PhD (Europe)", nodeColor: "#ec4899" },
        { id: "PhD (India)", nodeColor: "#f43f5e" },
        { id: "Industry Job", nodeColor: "#14b8a6" },

        { id: "Academia (Prof)", nodeColor: "#3b82f6" },
        { id: "Postdoc", nodeColor: "#8b5cf6" },
        { id: "Data Science", nodeColor: "#10b981" },
        { id: "Finance", nodeColor: "#f59e0b" },
        { id: "Startup Founder", nodeColor: "#ec4899" },
    ],
    links: [
        { source: "Physics Major", target: "PhD (US)", value: 15 },
        { source: "Physics Major", target: "PhD (Europe)", value: 12 },
        { source: "Physics Major", target: "PhD (India)", value: 8 },
        { source: "Physics Major", target: "Industry Job", value: 5 },

        { source: "Chemistry Major", target: "PhD (US)", value: 10 },
        { source: "Chemistry Major", target: "PhD (Europe)", value: 8 },
        { source: "Chemistry Major", target: "Industry Job", value: 12 },

        { source: "Biology Major", target: "PhD (Europe)", value: 15 },
        { source: "Biology Major", target: "PhD (India)", value: 10 },

        { source: "PhD (US)", target: "Postdoc", value: 12 },
        { source: "PhD (US)", target: "Data Science", value: 8 },
        { source: "PhD (Europe)", target: "Postdoc", value: 15 },
        { source: "PhD (India)", target: "Academia (Prof)", value: 5 },
        { source: "Industry Job", target: "Finance", value: 8 },
        { source: "Physics Major", target: "Startup Founder", value: 2 },
        { source: "PhD (Europe)", target: "Startup Founder", value: 3 },
    ]
};

export const CareerSankey = () => {
    return (
        <div className="h-[500px] w-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Career Pathways: Class of 2018-2022</h3>
            <ResponsiveSankey
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                align="justify"
                colors={node => node.nodeColor}
                nodeOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={0}
                nodeBorderRadius={3}
                linkOpacity={0.2}
                linkHoverOthersOpacity={0.1}
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="horizontal"
                labelPadding={16}
                labelTextColor={{ from: 'color', modifiers: [['brighter', 1]] }}
                theme={{
                    text: {
                        fill: "#e5e7eb",
                        fontSize: 12,
                        fontFamily: "inherit"
                    },
                    tooltip: {
                        container: {
                            background: "#1f2937",
                            color: "#f3f4f6",
                            fontSize: "12px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }
                    }
                }}
            />
        </div>
    );
};
