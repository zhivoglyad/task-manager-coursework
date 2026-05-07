import { describe, it, expect, beforeEach } from 'vitest'
import { loadFromStorage, saveToStorage, removeFromStorage } from './storage'

describe('storage utilities', () => {
  beforeEach(() => localStorage.clear())

  it('saves and loads an object', () => {
    saveToStorage('key', { a: 1 })
    expect(loadFromStorage('key', null)).toEqual({ a: 1 })
  })

  it('returns fallback when key does not exist', () => {
    expect(loadFromStorage('missing', 42)).toBe(42)
  })

  it('returns fallback when JSON is invalid', () => {
    localStorage.setItem('bad', 'not-json{{{')
    expect(loadFromStorage('bad', 'fallback')).toBe('fallback')
  })

  it('removeFromStorage deletes the key', () => {
    saveToStorage('del', 'value')
    removeFromStorage('del')
    expect(loadFromStorage('del', null)).toBeNull()
  })
})
