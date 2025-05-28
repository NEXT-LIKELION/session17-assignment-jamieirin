
import { NextResponse } from 'next/server'
import { posts } from '../../posts/data.js'

let id = posts.length + 1

export async function GET() {
  return NextResponse.json(posts)
}

export async function POST(req) {
  const { title, author, content, mood } = await req.json()
  const name = author || `익명${Math.floor(Math.random() * 1000)}`

  let quote = ''
  let quoteAuthor = ''

  try {
    const res = await fetch('https://zenquotes.io/api/random')
    const data = await res.json()
    quote = data[0]?.q || '명언 없음'
    quoteAuthor = data[0]?.a || ''
  } catch (e) {
    quote = '명언 불러오기 실패'
    quoteAuthor = ''
  }

  posts.push({ id, title, name, content, quote, quoteAuthor, mood })
  id++

  return NextResponse.json({ ok: true })
}
