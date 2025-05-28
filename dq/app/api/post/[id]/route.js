

import { NextResponse } from 'next/server'
import { posts } from '../../../posts/data.js'

export async function GET(req, { params }) {
  const id = Number(params?.id || 0)

  const post = posts.find((p) => p.id === id)

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
