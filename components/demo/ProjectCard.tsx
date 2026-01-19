"use client";

interface ProjectCardProps {
    title: string;
    category: string;
    description: string;
    tech: string[];
    gradient: string;
}

export function ProjectCard({ title, category, description, tech, gradient }: ProjectCardProps) {
    return (
        <div className="group relative rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            {/* Gradient Border */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="relative h-full bg-card rounded-[10px] p-6 flex flex-col gap-4 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                    </svg>
                </div>

                <div>
                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">{category}</span>
                    <h3 className="text-xl font-bold font-sans mt-1 group-hover:text-primary transition-colors">{title}</h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                    {tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
