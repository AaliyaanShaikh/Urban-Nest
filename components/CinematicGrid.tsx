"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureItem {
    title: string;
    desc: string;
    icon?: () => React.ReactNode;
    img?: string;
}

interface CinematicGridProps {
    features?: FeatureItem[];
    backgroundColor?: string;
    stickyTop?: string;
}

type StickyCardProps = { item: FeatureItem; index: number; stickyTop?: string; key?: React.Key };
const StickyCard = ({ item, index, stickyTop = "top-24" }: StickyCardProps) => {
    const Icon = item.icon;
    return (
        <section className="min-h-screen flex items-center justify-center py-24">
            <div className={`sticky ${stickyTop} w-full flex items-center justify-center py-10`}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ margin: "-10% 0px -10% 0px" }}
                className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group"
            >
                <div className="absolute inset-0">
                    {item.img && (
                        <>
                            <img src={item.img} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </>
                    )}
                </div>

                <div className="absolute inset-0 p-12 flex flex-col justify-end items-start z-10">
                    {Icon && (
                        <div className="mb-6 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
                            <Icon />
                        </div>
                    )}
                    <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-white mb-4 mix-blend-overlay">{item.title}</h2>
                    <p className="text-xl text-neutral-400 max-w-md">{item.desc}</p>
                </div>

                <div className="absolute top-6 right-6 font-mono text-sm text-white/30">
                    0{index + 1} — FEATURE
                </div>
            </motion.div>
            </div>
        </section>
    );
};

const CinematicGrid: React.FC<CinematicGridProps> = ({
    features = [
        { title: "Global Edge", desc: "Latency is a choice. We chose zero.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" },
        { title: "Neural Engine", desc: "Predictive scaling before the spike hits.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" },
        { title: "Vault Security", desc: "Encryption that physics can't break.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
        { title: "Fluid Workflow", desc: "Design to production in one breath.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
    ],
    backgroundColor = "#000000",
    stickyTop = "top-24",
}) => {
    return (
        <div className="font-sans" style={{ backgroundColor }}>
            <div className="max-w-5xl mx-auto px-4 md:px-12">
                {features.map((feat, i) => (
                    <StickyCard key={i} item={feat} index={i} stickyTop={stickyTop} />
                ))}
            </div>
        </div>
    );
};

export default CinematicGrid;
