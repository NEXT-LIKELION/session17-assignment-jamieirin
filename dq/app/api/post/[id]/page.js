'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'

export default function PostDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedMood, setSelectedMood] = useState('')

  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setSelectedMood(data.mood || '')
      })
  }, [id])

  const handleEmojiClick = (emojiData) => {
    setSelectedMood(emojiData.emoji)
  }

  if (!post) return <main style={{ padding: '2rem' }}>로딩 중...</main>

  return (
    <main style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '4rem 2rem',
      backgroundColor: '#fefefe',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
    }}>

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            backgroundColor: '#eaeaea',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🏠 홈으로
        </button>
      </div>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '1.2rem' }}>
        {selectedMood && <span style={{ marginRight: '0.5rem' }}>{selectedMood}</span>}
        {post.title}
      </h1>

      <p style={{ color: '#555', marginBottom: '0.5rem' }}>
        <strong>작성자:</strong> {post.name}
      </p>

      <p style={{
        fontSize: '1.15rem',
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
        marginBottom: '2.5rem'
      }}>{post.content}</p>

      <div style={{
        backgroundColor: '#fff8dc',
        padding: '1rem 1.5rem',
        borderLeft: '6px solid #ffe58f',
        borderRadius: '8px',
        fontStyle: 'italic',
        color: '#333',
        marginBottom: '2.5rem'
      }}>
        "{post.quote}"<br />
        <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>— {post.quoteAuthor}</span>
      </div>

      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        style={{
          backgroundColor: '#ffe58f',
          color: '#8c6d1f',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}
      >
        {selectedMood ? '기분 수정하기' : '기분 선택하기'}
      </button>

      {showEmojiPicker && (
        <div style={{ marginTop: '1rem', maxWidth: '320px' }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </main>
  )
}
