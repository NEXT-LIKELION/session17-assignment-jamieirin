'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'

export default function PostDetail() {
  const { id } = useParams()
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

  if (!post) return <main>로딩 중...</main>

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>

      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }}>
        {selectedMood && <span>{selectedMood} </span>}
        {post.title}
      </h1>

      <p style={{
        color: '#666',
        fontSize: '0.95rem',
        marginBottom: '1.5rem'
      }}>
        작성자: {post.name}
      </p>


      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.7',
        marginBottom: '2rem',
        whiteSpace: 'pre-line'
      }}>
        {post.content}
      </p>


      <blockquote style={{
        backgroundColor: '#fff8dc',
        borderLeft: '4px solid #ffec99',
        padding: '1rem',
        fontStyle: 'italic',
        marginBottom: '2rem',
        borderRadius: '8px',
        color: '#444'
      }}>
        "{post.quote}"<br />— {post.quoteAuthor}
      </blockquote>


      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {selectedMood ? 'edit mood' : 'select mood'}
        </button>

        {showEmojiPicker && (
          <div style={{ marginTop: '1rem', maxWidth: '300px' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </main>
  )
}
