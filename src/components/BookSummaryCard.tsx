import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Star, BookOpen, Calendar, User, ExternalLink } from 'lucide-react'
import type { CollectionEntry } from 'astro:content'

export interface Props {
    href?: string
    frontmatter: CollectionEntry<'blog'>['data']
    secHeading?: boolean
}

interface TableOfContentsItem {
    id: string
    title: string
    level: number
}

export default function BookSummaryCard({
    href,
    frontmatter,
    secHeading = true,
}: Props) {
    const [activeSection, setActiveSection] = useState<string>('')
    const [tableOfContents, setTableOfContents] = useState<
        TableOfContentsItem[]
    >([])
    const { title, pubDatetime, modDatetime, description, ogImage } =
        frontmatter

    // Parse markdown content to extract headings for TOC
    useEffect(() => {
        const headingRegex = /^(#{1,6})\s+(.+)$/gm
        const headings: TableOfContentsItem[] = []
        let match

        while ((match = headingRegex.exec(description)) !== null) {
            const level = match[1].length
            const title = match[2].trim()
            const id = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')

            headings.push({ id, title, level })
        }

        setTableOfContents(headings)
    }, [description])

    // Convert markdown to HTML (simplified) - optimized for Tailwind 3.4.11
    const parseMarkdown = (markdown: string) => {
        return markdown
            .replace(
                /^### (.*$)/gim,
                '<h3 id="$1" class="scroll-mt-4 text-xl font-semibold text-foreground mt-6 mb-3">$1</h3>'
            )
            .replace(
                /^## (.*$)/gim,
                '<h2 id="$1" class="scroll-mt-4 text-2xl font-semibold text-foreground mt-8 mb-4">$1</h2>'
            )
            .replace(
                /^# (.*$)/gim,
                '<h1 id="$1" class="scroll-mt-4 text-3xl font-bold text-foreground mt-10 mb-6">$1</h1>'
            )
            .replace(
                /\*\*(.*?)\*\*/gim,
                '<strong class="font-semibold text-foreground">$1</strong>'
            )
            .replace(
                /\*(.*?)\*/gim,
                '<em class="italic text-muted-foreground">$1</em>'
            )
            .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
            .replace(
                /\n\n/gim,
                '</p><p class="mb-4 leading-7 text-foreground">'
            )
            .replace(/\n/gim, '<br class="mb-2">')
    }

    const renderRating = (rating = 0) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        className={`size-4 transition-colors duration-200 ${
                            star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-600'
                        }`}
                    />
                ))}
                <span className="text-muted-foreground ml-2 text-sm font-medium">
                    ({rating}/5)
                </span>
            </div>
        )
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveSection(id)
        }
    }

    return (
        <div className="mx-auto max-w-7xl p-4">
            <Card className="bg-card w-full border-0 shadow-lg">
                <CardHeader className="pb-6">
                    <div className="lg:flex-row flex flex-col gap-6">
                        {/* Book Info Section */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <CardTitle className="text-card-foreground lg:text-3xl text-2xl font-bold leading-tight">
                                        {title}
                                    </CardTitle>
                                    <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <User className="size-4" />
                                            <span className="font-medium"></span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="size-4" />
                                            <span>
                                                {pubDatetime.toLocaleDateString(
                                                    'th-TH'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    {/* {bookData.rating && (
                                        <div className="pt-1">
                                            {renderRating(bookData.rating)}
                                        </div>
                                    )} */}
                                </div>
                                {/* {bookData.featured && (
                                    <Badge className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                        Featured
                                    </Badge>
                                )} */}
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {description}
                            </p>

                            {/* Tags */}
                            {/* <div className="flex flex-wrap gap-2">
                                {bookData.tags.map(tag => (
                                    <Badge
                                        key={tag}
                                        className="hover:bg-muted text-xs font-medium transition-colors duration-200"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div> */}

                            {/* {bookData.canonicalURL && (
                                <div className="pt-2">
                                    <Button asChild className="group">
                                        <a
                                            href={bookData.canonicalURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="mr-2 size-4 transition-transform group-hover:scale-110" />
                                            View Original
                                        </a>
                                    </Button>
                                </div>
                            )} */}
                        </div>

                        {/* Book Image */}
                        {/* {bookData.ogImage && (
                            <div className="lg:w-64 flex-shrink-0">
                                <div className="lg:max-w-none relative mx-auto aspect-[3/4] w-full max-w-48">
                                    <img
                                        src={
                                            bookData.ogImage ||
                                            '/placeholder.svg?height=400&width=300'
                                        }
                                        alt={`${bookData.title} cover`}
                                        // fill
                                        className="rounded-xl object-cover shadow-xl ring-1 ring-black/5 dark:ring-white/10"
                                        // priority
                                    />
                                </div>
                            </div>
                        )} */}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <div className="lg:grid-cols-4 grid gap-6">
                        {/* Table of Contents */}
                        <div className="lg:col-span-1">
                            <Card className="bg-muted/30 sticky top-4 border-0">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <BookOpen className="text-primary size-5" />
                                        สารบัญ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <nav className="space-y-1">
                                        {tableOfContents.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    scrollToSection(item.id)
                                                }
                                                className={`hover:bg-muted/80 block w-full rounded-md px-3 py-2 text-left text-sm transition-all duration-200 ${
                                                    activeSection === item.id
                                                        ? 'bg-primary/10 text-primary border-primary border-l-2 font-medium'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                                style={{
                                                    paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                                                }}
                                            >
                                                {item.title}
                                            </button>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
