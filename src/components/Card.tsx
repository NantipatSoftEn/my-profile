import { slugifyStr } from '@utils/slugify'
import Datetime from './Datetime'
import type { CollectionEntry } from 'astro:content'

export interface Props {
    href?: string
    frontmatter: CollectionEntry<'blog'>['data']
    secHeading?: boolean
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
    const { title, pubDatetime, modDatetime, description, ogImage } =
        frontmatter

    const headerProps = {
        style: { viewTransitionName: slugifyStr(title) },
        className: 'text-lg font-medium decoration-dashed hover:underline',
    }

    // Get image URL from ogImage or use a default image
    const imageUrl = typeof ogImage === 'string' ? ogImage : ogImage?.src || ''

    return (
        <li className="my-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Image Cover - only show if imageUrl exists */}
                {imageUrl && (
                    <a
                        href={href}
                        className="md:w-1/3 overflow-hidden rounded-lg"
                    >
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-300 w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </a>
                )}
                <div className={imageUrl ? 'md:w-2/3' : 'w-full'}>
                    <a
                        href={href}
                        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
                    >
                        {secHeading ? (
                            <h2 {...headerProps}>{title}</h2>
                        ) : (
                            <h3 {...headerProps}>{title}</h3>
                        )}
                    </a>
                    <Datetime
                        pubDatetime={pubDatetime}
                        modDatetime={modDatetime}
                    />
                    <p>{description}</p>
                </div>
            </div>
        </li>
    )
}
