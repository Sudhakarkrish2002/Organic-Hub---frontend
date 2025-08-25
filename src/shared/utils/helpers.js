export const classNames = (...classes) => classes.filter(Boolean).join(' ')
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

// Build an AI-generated image URL (Pollinations) with size and optional seed
export const aiImageUrl = (prompt, width = 1200, height = 600, seed = 42) => {
  try {
    const base = 'https://image.pollinations.ai/prompt/'
    const params = new URLSearchParams({ 
      width: String(width), 
      height: String(height), 
      nologo: 'true', 
      seed: String(seed) 
    })
    return `${base}${encodeURIComponent(prompt)}?${params.toString()}`
  } catch (error) {
    console.warn('Error generating AI image URL:', error)
    // Return a placeholder image URL
    return `https://via.placeholder.com/${width}x${height}/16a34a/ffffff?text=Organic+Hub`
  }
}

export const seasonalBannerAi = {
  spring: aiImageUrl('spring organic fruits and vegetables banner, high detail, soft lighting', 1600, 500, 111),
  summer: aiImageUrl('summer organic produce banner watermelon cucumber refreshing, high detail', 1600, 500, 222),
  monsoon: aiImageUrl('monsoon green vegetables banner, rain ambience cinematic lighting', 1600, 500, 333),
  winter: aiImageUrl('winter organic citrus and root vegetables banner cozy soft light', 1600, 500, 444),
}


