'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'
import Link from 'next/link'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, content, mood })
    })

    router.push('/')
  }

  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        <h1>일기 쓰기</h1>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            style={{
              backgroundColor: 'rgba(200, 200, 200, 0.3)',
              color: '#333',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(200, 200, 200, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(200, 200, 200, 0.3)'
            }}
          >
            {mood ? `기분: ${mood}` : 'Mood'}
          </button>

          {showPicker && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              zIndex: 1000
            }}>
              <EmojiPicker onEmojiClick={(e) => {
                setMood(e.emoji)
                setShowPicker(false)
              }} />
            </div>
          )}
        </div>
      </div>

   
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="작성자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        rows={8}
        placeholder="내용을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: '4rem', display: 'flex',
  justifyContent: 'center' }}>
        <button onClick={handleSubmit}>작성</button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10rem'
      }}>
        <Link href="/">
          <div
            title="홈으로 가기"
            style={{
              fontSize: '2rem',
              cursor: 'pointer'
            }}
          >
            🏠
          </div>
        </Link>
      </div>
    </main>
  )
}
