'use client'
import { useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface FileUploadProps {
  bucket: string
  path: string
  accept?: string
  maxSizeMB?: number
  maxDurationSec?: number
  onUpload: (url: string) => void
  label?: string
  preview?: string
  previewType?: 'image' | 'audio'
  multiple?: boolean
  onMultiUpload?: (urls: string[]) => void
  maxFiles?: number
}

export default function FileUpload({
  bucket, path, accept = 'image/*', maxSizeMB = 5, maxDurationSec,
  onUpload, label = 'Upload File', preview, previewType = 'image',
  multiple = false, onMultiUpload, maxFiles = 10,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateDuration = useCallback((file: File): Promise<boolean> => {
    if (!maxDurationSec) return Promise.resolve(true)
    return new Promise((resolve) => {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(audio.src)
        if (audio.duration > maxDurationSec) {
          setError(`Audio must be under ${Math.floor(maxDurationSec / 60)} minutes`)
          resolve(false)
        } else {
          resolve(true)
        }
      }
      audio.onerror = () => {
        URL.revokeObjectURL(audio.src)
        setError('Could not read audio file')
        resolve(false)
      }
      audio.src = URL.createObjectURL(file)
    })
  }, [maxDurationSec])

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const filePath = `${path}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      return null
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return data.publicUrl
  }, [bucket, path])

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setError('')
    setUploading(true)
    setProgress(0)

    const fileArray = Array.from(files).slice(0, multiple ? maxFiles : 1)

    // Validate sizes
    for (const file of fileArray) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File too large. Max ${maxSizeMB}MB`)
        setUploading(false)
        return
      }
    }

    // Validate audio duration if needed
    if (maxDurationSec) {
      for (const file of fileArray) {
        const valid = await validateDuration(file)
        if (!valid) { setUploading(false); return }
      }
    }

    if (multiple && onMultiUpload) {
      const urls: string[] = []
      for (let i = 0; i < fileArray.length; i++) {
        setProgress(Math.round(((i) / fileArray.length) * 100))
        const url = await uploadFile(fileArray[i])
        if (url) urls.push(url)
      }
      setProgress(100)
      onMultiUpload(urls)
    } else {
      setProgress(30)
      const url = await uploadFile(fileArray[0])
      setProgress(100)
      if (url) onUpload(url)
    }

    setUploading(false)
    setTimeout(() => setProgress(0), 1500)
  }, [multiple, maxFiles, maxSizeMB, maxDurationSec, validateDuration, uploadFile, onUpload, onMultiUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  return (
    <div style={{ width: '100%' }}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--dba, #A397DD)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 12,
          padding: '20px 16px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: dragOver ? 'rgba(163,151,221,0.08)' : 'rgba(255,255,255,0.03)',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        {uploading ? (
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
              Uploading... {progress}%
            </div>
            <div style={{
              width: '100%', height: 4, borderRadius: 2,
              background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
            }}>
              <div style={{
                width: `${progress}%`, height: '100%', borderRadius: 2,
                background: 'var(--dba, #A397DD)', transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dbt, #fff)', marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              {dragOver ? 'Drop to upload' : 'Click or drag & drop'}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{ fontSize: 12, color: '#f87171', marginTop: 6 }}>{error}</div>
      )}

      {/* Preview */}
      {preview && previewType === 'image' && (
        <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', maxHeight: 160 }}>
          <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
        </div>
      )}
      {preview && previewType === 'audio' && (
        <audio controls src={preview} style={{ width: '100%', marginTop: 10, borderRadius: 8 }} />
      )}
    </div>
  )
}
