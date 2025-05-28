'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data)
        else setPosts([])
      })
      .catch(() => setPosts([]))
  }, [])

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2rem' }}>📘 오늘의 일기</h1>
        <Link href="/write">
          <button style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            ✍️ 글 쓰기
          </button>
        </Link>
      </div>

      {posts.length > 0 ? (
        <ul style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {posts.map((post) => (
            <li key={post.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              listStyle: 'none',
              border: '1px solid #eee'
            }}>
              <Link href={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {post.mood ? `${post.mood} ` : ''}{post.title}
                </div>
                <div style={{
                  color: '#555',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {post.content.slice(0, 60)}{post.content.length > 60 && '...'}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{
          marginTop: '4rem',
          padding: '3rem 2rem',
          backgroundColor: '#fffbe6',
          border: '2px dashed #ffe58f',
          borderRadius: '16px',
          textAlign: 'center',
          fontSize: '1.4rem',
          color: '#8c6d1f',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          ✨ 오늘 있었던 일을 일기로 적어주세요!
        </div>
      )}
    </main>
  )
}
