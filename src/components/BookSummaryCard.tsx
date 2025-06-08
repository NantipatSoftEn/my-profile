"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Star, BookOpen, Calendar, User, ExternalLink } from "lucide-react"
// import Image from "next/image"

interface BookSummary {
    author: string
    pubDatetime: Date
    modDatetime?: Date | null
    title: string
    featured?: boolean
    draft?: boolean
    tags: string[]
    ogImage?: string
    description: string
    canonicalURL?: string
    content: string
    rating?: number
}

interface TableOfContentsItem {
    id: string
    title: string
    level: number
}

interface BookSummaryCardProps {
    content: any;
    post?: any;
}

export default function BookSummaryCard({ content, post }: BookSummaryCardProps) {
    console.log("content", content)
    console.log("post", post)
    const [activeSection, setActiveSection] = useState<string>("")
    const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])
    
    // Create a ref for the content container
    const contentRef = useRef<HTMLDivElement>(null)

    // Convert markdown to HTML (simplified) - optimized for Tailwind 3.4.11
    const parseMarkdown = (markdown: string) => {
        return markdown
            .replace(
                /^### (.*$)/gim,
                '<h3 id="$1" class="scroll-mt-4 text-xl font-semibold text-foreground mt-6 mb-3">$1</h3>',
            )
            .replace(
                /^## (.*$)/gim,
                '<h2 id="$1" class="scroll-mt-4 text-2xl font-semibold text-foreground mt-8 mb-4">$1</h2>',
            )
            .replace(/^# (.*$)/gim, '<h1 id="$1" class="scroll-mt-4 text-3xl font-bold text-foreground mt-10 mb-6">$1</h1>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-foreground">$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em class="italic text-muted-foreground">$1</em>')
            .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
            .replace(/\n\n/gim, '</p><p class="mb-4 leading-7 text-foreground">')
            .replace(/\n/gim, '<br class="mb-2">')
    }

    const renderRating = (rating = 0) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`size-4 transition-colors duration-200 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"
                            }`}
                    />
                ))}
                <span className="ml-2 text-sm font-medium text-muted-foreground">({rating}/5)</span>
            </div>
        )
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
            setActiveSection(id)
        }
    }

    // Use an effect to handle the rendering of Astro content in a React component
    useEffect(() => {
        if (content && contentRef.current) {
            // Clear previous content
            contentRef.current.innerHTML = '';
            
            // If content has render method (it's an Astro component)
            if (content.render && typeof content.render === 'function') {
                // Create a div to render the Astro content into
                const renderTarget = document.createElement('div');
                contentRef.current.appendChild(renderTarget);
                
                // Use setTimeout to ensure DOM is ready
                setTimeout(async () => {
                    try {
                        // Extract headings to build table of contents
                        const contentElement = contentRef.current;
                        if (contentElement) {
                            // Extract headings after content is rendered
                            setTimeout(() => {
                                const headings = Array.from(contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6'));
                                const tocItems: TableOfContentsItem[] = headings.map(h => {
                                    const level = parseInt(h.tagName.substring(1));
                                    const title = h.textContent || '';
                                    const id = h.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                    
                                    // Add ID if missing
                                    if (!h.id) {
                                        h.id = id;
                                    }
                                    
                                    return { id, title, level };
                                });
                                
                                setTableOfContents(tocItems);
                            }, 200);
                        }
                    } catch (error) {
                        console.error('Error rendering Astro content:', error);
                    }
                }, 0);
            }
        }
    }, [content]);

    return (
        <div className="mx-auto max-w-7xl p-4">
            <Card className="w-full shadow-lg border-0 bg-card">
                {post && (
                    <CardHeader className="pb-6">
                        <div className="flex flex-col gap-6 lg:flex-row">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <CardTitle className="text-2xl font-bold leading-tight text-card-foreground lg:text-3xl">
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            {post.author && (
                                                <div className="flex items-center gap-1.5">
                                                    <User className="size-4" />
                                                    <span className="font-medium">{post.author}</span>
                                                </div>
                                            )}
                                            {post.pubDatetime && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="size-4" />
                                                    <span>{new Date(post.pubDatetime).toLocaleDateString("th-TH")}</span>
                                                </div>
                                            )}
                                        </div>
                                        {post.rating && <div className="pt-1">{renderRating(post.rating)}</div>}
                                    </div>
                                    {post.featured && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                                        >
                                            Featured
                                        </Badge>
                                    )}
                                </div>

                                {post.description && (
                                    <p className="text-muted-foreground leading-relaxed">{post.description}</p>
                                )}

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs font-medium hover:bg-muted transition-colors duration-200"
                                            >
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {post.canonicalURL && (
                                    <div className="pt-2">
                                        <Button variant="outline" size="sm" asChild className="group">
                                            <a href={post.canonicalURL} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 size-4 transition-transform group-hover:scale-110" />
                                                View Original
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {post.ogImage && (
                                <div className="flex-shrink-0 lg:w-64">
                                    <div className="relative mx-auto aspect-[3/4] w-full max-w-48 lg:max-w-none">
                                        <img
                                            src={post.ogImage || "/placeholder.svg?height=400&width=300"}
                                            alt={`${post.title} cover`}
                                            className="rounded-xl object-cover shadow-xl ring-1 ring-black/5 dark:ring-white/10"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                )}

                <CardContent className={post ? "pt-0" : "pt-6"}>
                    <div className="grid gap-6 lg:grid-cols-4">
                        {tableOfContents.length > 0 && (
                            <div className="lg:col-span-1">
                                <Card className="sticky top-4 border-0 bg-muted/30">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <BookOpen className="size-5 text-primary" />
                                            สารบัญ
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <nav className="space-y-1">
                                            {tableOfContents.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className={`block w-full rounded-md py-2 px-3 text-left text-sm transition-all duration-200 hover:bg-muted/80 ${activeSection === item.id
                                                            ? "bg-primary/10 font-medium text-primary border-l-2 border-primary"
                                                            : "text-muted-foreground hover:text-foreground"
                                                        }`}
                                                    style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                                                >
                                                    {item.title}
                                                </button>
                                            ))}
                                        </nav>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        <div className={tableOfContents.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
                            <Card className="border-0 bg-card/50">
                                <CardContent className="pt-6">
                                    <div 
                                        ref={contentRef}
                                        className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-4 prose-p:leading-7 prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
