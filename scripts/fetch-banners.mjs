import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outDir = join(__dirname, '..', 'public', 'seasonal')
mkdirSync(outDir, { recursive: true })

const buildUrl = (prompt, width = 1600, height = 500, seed = 1) => {
  const base = 'https://image.pollinations.ai/prompt/'
  const params = new URLSearchParams({ width: String(width), height: String(height), nologo: 'true', seed: String(seed) })
  return `${base}${encodeURIComponent(prompt)}?${params.toString()}`
}

const banners = [
  {
    season: 'spring',
    file: 'spring-ai.jpg',
    url: buildUrl('spring organic fruits and vegetables banner, high detail, soft lighting', 1600, 500, 111),
  },
  {
    season: 'summer',
    file: 'summer-ai.jpg',
    url: buildUrl('summer organic produce banner watermelon cucumber refreshing, high detail', 1600, 500, 222),
  },
  {
    season: 'monsoon',
    file: 'monsoon-ai.jpg',
    url: buildUrl('monsoon green vegetables banner, rain ambience cinematic lighting', 1600, 500, 333),
  },
  {
    season: 'winter',
    file: 'winter-ai.jpg',
    url: buildUrl('winter organic citrus and root vegetables banner cozy soft light', 1600, 500, 444),
  },
]

const download = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  return buf
}

;(async () => {
  for (const b of banners) {
    const target = join(outDir, b.file)
    try {
      process.stdout.write(`Downloading ${b.season} → ${b.file}... `)
      const data = await download(b.url)
      writeFileSync(target, data)
      process.stdout.write('done\n')
    } catch (e) {
      console.error(`error:`, e.message)
    }
  }
  console.log('All done. Files saved to', outDir)
})()


