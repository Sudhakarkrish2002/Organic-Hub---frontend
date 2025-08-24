import React from 'react'
import { aiImageUrl } from '@/shared/utils/helpers'

const SeasonalBanner = ({
  title = 'Seasonal Offers',
  subtitle = 'Fresh picks of the season',
  imageUrl,
}) => {
  const fallback = aiImageUrl(
    'seasonal organic fruits and vegetables banner, wide hero, soft lighting, high detail',
    1600,
    500,
    777
  )

  const src = imageUrl || fallback

  return (
    <div className="w-full container-padding">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={src}
          alt={title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = fallback
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4 drop-shadow-lg">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 max-w-2xl drop-shadow-lg font-body">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SeasonalBanner
