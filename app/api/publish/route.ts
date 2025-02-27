import { NextResponse } from 'next/server'

interface ArticlePayload {
    article: {
        title: string
        body_markdown: string
        published: boolean
        tags?: string[]
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { markdown, title, tags = [] } = body

        const apiKey = process.env.DEVTO_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'DEV.TO API key not configured' },
                { status: 500 }
            )
        }

        const payload: ArticlePayload = {
            article: {
                title,
                body_markdown: markdown,
                published: false, // Set as draft
                tags
            }
        }

        const response = await fetch('https://dev.to/api/articles', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const error = await response.text()
            return NextResponse.json({ error }, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to publish article' },
            { status: 500 }
        )
    }
}