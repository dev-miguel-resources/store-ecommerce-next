'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeartFavoriteProps {
  product: ProductType
  updateSignedInUser?: (updatedUser: UserType) => void
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter()
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/users')
      const data = await res.json()
      setIsLiked(data.wishlist.includes(product._id))
      setLoading(false)
    } catch (err) {
      console.log('[users_GET]', err)
    }
  }

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    try {
      if (!user) {
        router.push('/sign-in')
        return
      } else {
        const res = await fetch('/api/users/wishlist', {
          method: 'POST',
          body: JSON.stringify({ productId: product._id }),
        })
        const updatedUser = await res.json()
        setIsLiked(updatedUser.wishlist.includes(product._id))
        updateSignedInUser && updateSignedInUser(updatedUser)
      }
    } catch (err) {
      console.log('[wishlist_POST]', err)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? 'red' : 'white'}`} />
    </button>
  )
}

export default HeartFavorite
