import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, ArrowLeft, Minus, Plus, Loader2 } from 'lucide-react'
import { addToCart } from '@/core/store/slices/cartSlice'
import { aiImageUrl } from '@/shared/utils/helpers'
import useWishlist from '@/shared/hooks/useWishlist'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import SeasonalBadge from '@/features/products/components/SeasonalBadge'
import { toast } from 'react-hot-toast'
import productAPI from '@/features/products/services/productAPI'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [localWishlistState, setLocalWishlistState] = useState(null)
  
  // Sample products data as fallback
  const sampleProducts = [
    {
      _id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'vegetables',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 156,
      image: aiImageUrl('fresh organic red tomatoes, high quality, natural lighting, studio photography', 600, 600, 301),
      images: [
        aiImageUrl('fresh organic red tomatoes, high quality, natural lighting, studio photography', 600, 600, 301),
        aiImageUrl('organic tomatoes close up, natural', 800, 600, 98),
        aiImageUrl('organic tomatoes on vine', 800, 600, 97)
      ],
      description: 'Fresh, juicy organic tomatoes rich in lycopene and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'fresh', 'antioxidants'],
      weight: '500g',
      seasonal: true,
      season: 'summer'
    },
    {
      _id: 2,
      name: 'Organic Bananas',
      category: 'fruits',
      price: 80,
      originalPrice: 100,
      rating: 4.6,
      reviews: 89,
      image: aiImageUrl('organic yellow bananas, fresh, natural, high detail photography', 600, 600, 302),
      images: [
        aiImageUrl('organic yellow bananas, fresh, natural, high detail photography', 600, 600, 302),
        aiImageUrl('organic bananas bunch, natural', 800, 600, 96),
        aiImageUrl('organic bananas close up', 800, 600, 95)
      ],
      description: 'Sweet organic bananas packed with potassium and natural energy',
      inStock: true,
      discount: 20,
      tags: ['organic', 'energy', 'potassium'],
      weight: '1 kg',
      seasonal: false
    },
    {
      _id: 3,
      name: 'Fresh Spinach Leaves',
      category: 'vegetables',
      price: 60,
      originalPrice: 75,
      rating: 4.9,
      reviews: 203,
      image: aiImageUrl('fresh organic spinach leaves, green, crisp, macro photography', 600, 600, 303),
      images: [
        aiImageUrl('fresh organic spinach leaves, green, crisp, macro photography', 600, 600, 303),
        aiImageUrl('organic spinach leaves close up', 800, 600, 94),
        aiImageUrl('organic spinach in basket', 800, 600, 93)
      ],
      description: 'Nutrient-rich organic spinach with iron and vitamins',
      inStock: true,
      discount: 20,
      tags: ['organic', 'iron', 'vitamins'],
      weight: '250g',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 4,
      name: 'Organic Apples',
      category: 'fruits',
      price: 200,
      originalPrice: 250,
      rating: 4.7,
      reviews: 134,
      image: aiImageUrl('organic red apples, fresh, crisp, natural lighting, food photography', 600, 600, 304),
      images: [
        aiImageUrl('organic red apples, fresh, crisp, natural lighting, food photography', 600, 600, 304),
        aiImageUrl('organic apples close up', 800, 600, 92),
        aiImageUrl('organic apples in basket', 800, 600, 91)
      ],
      description: 'Crisp organic apples with natural sweetness and fiber',
      inStock: true,
      discount: 20,
      tags: ['organic', 'fiber', 'antioxidants'],
      weight: '1 kg',
      seasonal: true,
      season: 'autumn'
    },
    {
      _id: 5,
      name: 'Fresh Carrots',
      category: 'vegetables',
      price: 90,
      originalPrice: 110,
      rating: 4.5,
      reviews: 78,
      image: aiImageUrl('fresh organic carrots, orange, crisp, natural background', 600, 600, 305),
      images: [
        aiImageUrl('fresh organic carrots, orange, crisp, natural background', 600, 600, 305),
        aiImageUrl('organic carrots close up', 800, 600, 90),
        aiImageUrl('organic carrots in basket', 800, 600, 89)
      ],
      description: 'Sweet organic carrots rich in beta-carotene and fiber',
      inStock: true,
      discount: 18,
      tags: ['organic', 'beta-carotene', 'fiber'],
      weight: '500g',
      seasonal: false
    },
    {
      _id: 6,
      name: 'Organic Oranges',
      category: 'fruits',
      price: 150,
      originalPrice: 180,
      rating: 4.8,
      reviews: 167,
      image: aiImageUrl('organic oranges, fresh, juicy, citrus, natural lighting', 600, 600, 306),
      images: [
        aiImageUrl('organic oranges, fresh, juicy, citrus, natural lighting', 600, 600, 306),
        aiImageUrl('organic oranges close up', 800, 600, 88),
        aiImageUrl('organic oranges in basket', 800, 600, 87)
      ],
      description: 'Juicy organic oranges packed with vitamin C and antioxidants',
      inStock: true,
      discount: 17,
      tags: ['organic', 'vitamin-c', 'antioxidants'],
      weight: '1 kg',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 7,
      name: 'Fresh Broccoli',
      category: 'vegetables',
      price: 100,
      originalPrice: 120,
      rating: 4.6,
      reviews: 92,
      image: aiImageUrl('fresh organic broccoli, green, crisp, macro photography', 600, 600, 307),
      images: [
        aiImageUrl('fresh organic broccoli, green, crisp, macro photography', 600, 600, 307),
        aiImageUrl('organic broccoli close up', 800, 600, 86),
        aiImageUrl('organic broccoli in basket', 800, 600, 85)
      ],
      description: 'Nutritious organic broccoli with vitamins and minerals',
      inStock: true,
      discount: 17,
      tags: ['organic', 'vitamins', 'minerals'],
      weight: '500g',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 8,
      name: 'Organic Strawberries',
      category: 'fruits',
      price: 180,
      originalPrice: 220,
      rating: 4.9,
      reviews: 245,
      image: aiImageUrl('organic strawberries, red, fresh, sweet, natural lighting', 600, 600, 308),
      images: [
        aiImageUrl('organic strawberries, red, fresh, sweet, natural lighting', 600, 600, 308),
        aiImageUrl('organic strawberries close up', 800, 600, 84),
        aiImageUrl('organic strawberries in basket', 800, 600, 83)
      ],
      description: 'Sweet organic strawberries rich in antioxidants and vitamin C',
      inStock: true,
      discount: 18,
      tags: ['organic', 'antioxidants', 'vitamin-c'],
      weight: '250g',
      seasonal: true,
      season: 'spring'
    },
    {
      _id: 9,
      name: 'Fresh Cauliflower',
      category: 'vegetables',
      price: 85,
      originalPrice: 105,
      rating: 4.4,
      reviews: 67,
      image: aiImageUrl('fresh organic cauliflower, white, crisp, natural background', 600, 600, 309),
      images: [
        aiImageUrl('fresh organic cauliflower, white, crisp, natural background', 600, 600, 309),
        aiImageUrl('organic cauliflower close up', 800, 600, 82),
        aiImageUrl('organic cauliflower in basket', 800, 600, 81)
      ],
      description: 'Fresh organic cauliflower with anti-inflammatory properties',
      inStock: true,
      discount: 19,
      tags: ['organic', 'anti-inflammatory', 'fiber'],
      weight: '1 kg',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 10,
      name: 'Organic Grapes',
      category: 'fruits',
      price: 160,
      originalPrice: 200,
      rating: 4.7,
      reviews: 123,
      image: aiImageUrl('organic grapes, purple, fresh, natural, food photography', 600, 600, 310),
      images: [
        aiImageUrl('organic grapes, purple, fresh, natural, food photography', 600, 600, 310),
        aiImageUrl('organic grapes close up', 800, 600, 80),
        aiImageUrl('organic grapes in basket', 800, 600, 79)
      ],
      description: 'Sweet organic grapes with natural sugars and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'antioxidants', 'natural-sugar'],
      weight: '500g',
      seasonal: true,
      season: 'autumn'
    },
    {
      _id: 11,
      name: 'Fresh Bell Peppers',
      category: 'vegetables',
      price: 120,
      originalPrice: 150,
      rating: 4.5,
      reviews: 89,
      image: aiImageUrl('fresh organic bell peppers, colorful, crisp, natural lighting', 600, 600, 311),
      images: [
        aiImageUrl('fresh organic bell peppers, colorful, crisp, natural lighting', 600, 600, 311),
        aiImageUrl('organic bell peppers close up', 800, 600, 78),
        aiImageUrl('organic bell peppers in basket', 800, 600, 77)
      ],
      description: 'Colorful organic bell peppers rich in vitamins and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'vitamins', 'antioxidants'],
      weight: '500g',
      seasonal: false
    },
    {
      _id: 12,
      name: 'Organic Mangoes',
      category: 'fruits',
      price: 250,
      originalPrice: 300,
      rating: 4.8,
      reviews: 178,
      image: aiImageUrl('organic mangoes, ripe, yellow, tropical, natural lighting', 600, 600, 312),
      images: [
        aiImageUrl('organic mangoes, ripe, yellow, tropical, natural lighting', 600, 600, 312),
        aiImageUrl('organic mangoes close up', 800, 600, 76),
        aiImageUrl('organic mangoes in basket', 800, 600, 75)
      ],
      description: 'Sweet organic mangoes with tropical flavor and vitamins',
      inStock: true,
      discount: 17,
      tags: ['organic', 'tropical', 'vitamins'],
      weight: '1 kg',
      seasonal: true,
      season: 'summer'
    },
    {
      _id: 13,
      name: 'Organic Whole Milk (1L)',
      category: 'dairy',
      price: 70,
      originalPrice: 85,
      rating: 4.7,
      reviews: 210,
      image: aiImageUrl('glass bottle of organic whole milk, minimal aesthetic, soft natural lighting, condensation, studio photography', 600, 600, 401),
      images: [
        aiImageUrl('glass bottle of organic whole milk, minimal aesthetic, soft natural lighting, condensation, studio photography', 600, 600, 401),
        aiImageUrl('organic milk close up', 800, 600, 74),
        aiImageUrl('organic milk in fridge', 800, 600, 73)
      ],
      description: 'Creamy farm-fresh organic whole milk, antibiotic-free and hormone-free',
      inStock: true,
      discount: 18,
      tags: ['dairy', 'organic', 'calcium'],
      weight: '1L',
      seasonal: false
    },
    {
      _id: 14,
      name: 'Farm Fresh Yogurt (500g)',
      category: 'dairy',
      price: 65,
      originalPrice: 80,
      rating: 4.6,
      reviews: 164,
      image: aiImageUrl('organic plain yogurt in ceramic bowl with spoon, creamy texture, soft daylight food photography', 600, 600, 402),
      images: [
        aiImageUrl('organic plain yogurt in ceramic bowl with spoon, creamy texture, soft daylight food photography', 600, 600, 402),
        aiImageUrl('organic yogurt close up', 800, 600, 72),
        aiImageUrl('organic yogurt in bowl', 800, 600, 71)
      ],
      description: 'Thick and creamy probiotic-rich organic yogurt',
      inStock: true,
      discount: 19,
      tags: ['dairy', 'probiotics', 'organic'],
      weight: '500g',
      seasonal: false
    },
    {
      _id: 15,
      name: 'Grass-Fed Butter (200g)',
      category: 'dairy',
      price: 160,
      originalPrice: 190,
      rating: 4.8,
      reviews: 132,
      image: aiImageUrl('organic grass-fed butter block on parchment, golden color, rustic wooden board, soft light', 600, 600, 403),
      images: [
        aiImageUrl('organic grass-fed butter block on parchment, golden color, rustic wooden board, soft light', 600, 600, 403),
        aiImageUrl('organic butter close up', 800, 600, 70),
        aiImageUrl('organic butter on bread', 800, 600, 69)
      ],
      description: 'Rich, golden butter made from grass-fed organic milk',
      inStock: true,
      discount: 16,
      tags: ['dairy', 'grass-fed', 'healthy-fats'],
      weight: '200g',
      seasonal: false
    },
    {
      _id: 16,
      name: 'Organic Paneer (200g)',
      category: 'dairy',
      price: 95,
      originalPrice: 120,
      rating: 4.5,
      reviews: 98,
      image: aiImageUrl('fresh organic paneer cubes on a plate, soft texture, bright clean lighting, food photography', 600, 600, 404),
      images: [
        aiImageUrl('fresh organic paneer cubes on a plate, soft texture, bright clean lighting, food photography', 600, 600, 404),
        aiImageUrl('organic paneer close up', 800, 600, 68),
        aiImageUrl('organic paneer in curry', 800, 600, 67)
      ],
      description: 'Soft, fresh organic paneer with high protein content',
      inStock: true,
      discount: 21,
      tags: ['dairy', 'protein', 'fresh'],
      weight: '200g',
      seasonal: false
    },
    {
      _id: 17,
      name: 'Organic Brown Rice (1kg)',
      category: 'grains',
      price: 140,
      originalPrice: 170,
      rating: 4.7,
      reviews: 187,
      image: aiImageUrl('organic brown rice grains in a bowl, earthy tones, natural light, high detail', 600, 600, 405),
      images: [
        aiImageUrl('organic brown rice grains in a bowl, earthy tones, natural light, high detail', 600, 600, 405),
        aiImageUrl('organic brown rice close up', 800, 600, 66),
        aiImageUrl('organic brown rice cooked', 800, 600, 65)
      ],
      description: 'Whole-grain brown rice rich in fiber and nutrients',
      inStock: true,
      discount: 18,
      tags: ['grains', 'fiber', 'whole-grain'],
      weight: '1kg',
      seasonal: false
    },
    {
      _id: 18,
      name: 'Organic Quinoa (500g)',
      category: 'grains',
      price: 220,
      originalPrice: 260,
      rating: 4.6,
      reviews: 143,
      image: aiImageUrl('raw organic quinoa seeds in glass jar, clean minimal style, studio lighting', 600, 600, 406),
      images: [
        aiImageUrl('raw organic quinoa seeds in glass jar, clean minimal style, studio lighting', 600, 600, 406),
        aiImageUrl('organic quinoa close up', 800, 600, 64),
        aiImageUrl('organic quinoa cooked', 800, 600, 63)
      ],
      description: 'High-protein organic quinoa, complete plant protein source',
      inStock: true,
      discount: 15,
      tags: ['grains', 'protein', 'gluten-free'],
      weight: '500g',
      seasonal: false
    },
    {
      _id: 19,
      name: 'Whole Wheat Flour (Atta) 1kg',
      category: 'grains',
      price: 70,
      originalPrice: 90,
      rating: 4.5,
      reviews: 165,
      image: aiImageUrl('organic whole wheat flour in bowl with grains, rustic kitchen scene, soft daylight', 600, 600, 407),
      images: [
        aiImageUrl('organic whole wheat flour in bowl with grains, rustic kitchen scene, soft daylight', 600, 600, 407),
        aiImageUrl('organic wheat flour close up', 800, 600, 62),
        aiImageUrl('organic wheat flour in bowl', 800, 600, 61)
      ],
      description: 'Stone-ground organic whole wheat flour for healthier rotis and baking',
      inStock: true,
      discount: 22,
      tags: ['grains', 'whole-wheat', 'fiber'],
      weight: '1kg',
      seasonal: false
    },
    {
      _id: 20,
      name: 'Rolled Oats (1kg)',
      category: 'grains',
      price: 180,
      originalPrice: 210,
      rating: 4.7,
      reviews: 121,
      image: aiImageUrl('organic rolled oats in bowl with spoon, cozy breakfast aesthetic, high detail', 600, 600, 408),
      images: [
        aiImageUrl('organic rolled oats in bowl with spoon, cozy breakfast aesthetic, high detail', 600, 600, 408),
        aiImageUrl('organic oats close up', 800, 600, 60),
        aiImageUrl('organic oats cooked', 800, 600, 59)
      ],
      description: 'Heart-healthy organic rolled oats for wholesome breakfast bowls',
      inStock: true,
      discount: 14,
      tags: ['grains', 'fiber', 'breakfast'],
      weight: '1kg',
      seasonal: false
    },
    {
      _id: 21,
      name: 'Raw Forest Honey (500g)',
      category: 'natural',
      price: 320,
      originalPrice: 380,
      rating: 4.8,
      reviews: 204,
      image: aiImageUrl('jar of raw organic honey with honey dipper, golden glow, sunlight, high detail', 600, 600, 409),
      images: [
        aiImageUrl('jar of raw organic honey with honey dipper, golden glow, sunlight, high detail', 600, 600, 409),
        aiImageUrl('organic honey close up', 800, 600, 58),
        aiImageUrl('organic honey in jar', 800, 600, 57)
      ],
      description: 'Unprocessed raw honey rich in enzymes and antioxidants',
      inStock: true,
      discount: 16,
      tags: ['natural', 'antioxidants', 'raw'],
      weight: '500g',
      seasonal: false
    },
    {
      _id: 22,
      name: 'Cold-Pressed Coconut Oil (500ml)',
      category: 'natural',
      price: 280,
      originalPrice: 330,
      rating: 4.7,
      reviews: 149,
      image: aiImageUrl('clear bottle of cold pressed organic coconut oil, coconut halves, clean minimal scene, soft light', 600, 600, 410),
      images: [
        aiImageUrl('clear bottle of cold pressed organic coconut oil, coconut halves, clean minimal scene, soft light', 600, 600, 410),
        aiImageUrl('organic coconut oil close up', 800, 600, 56),
        aiImageUrl('organic coconut oil in bottle', 800, 600, 55)
      ],
      description: 'Pure cold-pressed coconut oil for cooking and wellness',
      inStock: true,
      discount: 15,
      tags: ['natural', 'cold-pressed', 'healthy-fats'],
      weight: '500ml',
      seasonal: false
    },
    {
      _id: 23,
      name: 'Organic Jaggery (800g)',
      category: 'natural',
      price: 180,
      originalPrice: 220,
      rating: 4.6,
      reviews: 112,
      image: aiImageUrl('organic jaggery blocks on a plate, rustic look, warm tones, high detail', 600, 600, 411),
      images: [
        aiImageUrl('organic jaggery blocks on a plate, rustic look, warm tones, high detail', 600, 600, 411),
        aiImageUrl('organic jaggery close up', 800, 600, 54),
        aiImageUrl('organic jaggery in bowl', 800, 600, 53)
      ],
      description: 'Natural unrefined cane sweetener rich in minerals',
      inStock: true,
      discount: 18,
      tags: ['natural', 'unrefined', 'minerals'],
      weight: '800g',
      seasonal: false
    },
    {
      _id: 24,
      name: 'Raw Almonds (500g)',
      category: 'natural',
      price: 420,
      originalPrice: 480,
      rating: 4.9,
      reviews: 256,
      image: aiImageUrl('raw organic almonds in bowl, top-down, clean background, studio lighting, high detail', 600, 600, 412),
      images: [
        aiImageUrl('raw organic almonds in bowl, top-down, clean background, studio lighting, high detail', 600, 600, 412),
        aiImageUrl('organic almonds close up', 800, 600, 52),
        aiImageUrl('organic almonds in bowl', 800, 600, 51)
      ],
      description: 'Crunchy raw almonds packed with healthy fats and vitamin E',
      inStock: true,
      discount: 12,
      tags: ['natural', 'nuts', 'vitamin-e'],
      weight: '500g',
      seasonal: false
    },
    // Seasonal Products - Spring
    {
      _id: 'spring-1',
      name: 'Fresh Asparagus',
      category: 'vegetables',
      price: 180,
      originalPrice: 220,
      rating: 5,
      reviews: 89,
      image: 'https://image.pollinations.ai/prompt/fresh%20organic%20asparagus%20spears%20on%20wooden%20board%2C%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=531',
      images: [
        'https://image.pollinations.ai/prompt/fresh%20organic%20asparagus%20spears%20on%20wooden%20board%2C%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=531',
        'https://image.pollinations.ai/prompt/fresh%20organic%20asparagus%20close%20up%2C%20green%20spears%2C%20natural%20lighting?width=800&height=600&nologo=true&seed=532',
        'https://image.pollinations.ai/prompt/fresh%20organic%20asparagus%20in%20basket%2C%20spring%20vegetables?width=800&height=600&nologo=true&seed=533'
      ],
      description: 'Tender spring asparagus rich in vitamins and minerals',
      inStock: true,
      discount: 18,
      tags: ['vegetables', 'organic', 'spring', 'vitamins'],
      weight: '250g',
      seasonal: true,
      season: 'spring'
    },
    {
      _id: 'spring-2',
      name: 'Farm Fresh Yogurt',
      category: 'dairy',
      price: 65,
      originalPrice: 80,
      rating: 5,
      reviews: 144,
      image: 'https://image.pollinations.ai/prompt/farm%20fresh%20organic%20yogurt%20in%20ceramic%20bowl%2C%20creamy%20texture%2C%20soft%20daylight?width=800&height=600&nologo=true&seed=521',
      images: [
        'https://image.pollinations.ai/prompt/farm%20fresh%20organic%20yogurt%20in%20ceramic%20bowl%2C%20creamy%20texture%2C%20soft%20daylight?width=800&height=600&nologo=true&seed=521',
        'https://image.pollinations.ai/prompt/organic%20yogurt%20close%20up%2C%20creamy%20texture?width=800&height=600&nologo=true&seed=522',
        'https://image.pollinations.ai/prompt/organic%20yogurt%20with%20berries%2C%20healthy%20breakfast?width=800&height=600&nologo=true&seed=523'
      ],
      description: 'Creamy probiotic yogurt perfect for spring',
      inStock: true,
      discount: 19,
      tags: ['dairy', 'probiotics', 'organic', 'spring'],
      weight: '500g',
      seasonal: true,
      season: 'spring'
    },
    {
      _id: 'spring-3',
      name: 'Raw Forest Honey',
      category: 'natural',
      price: 320,
      originalPrice: 380,
      rating: 5,
      reviews: 204,
      image: 'https://image.pollinations.ai/prompt/jar%20of%20raw%20organic%20honey%20with%20dipper%2C%20golden%20glow%2C%20sunlight%2C%20high%20detail?width=800&height=600&nologo=true&seed=522',
      images: [
        'https://image.pollinations.ai/prompt/jar%20of%20raw%20organic%20honey%20with%20dipper%2C%20golden%20glow%2C%20sunlight%2C%20high%20detail?width=800&height=600&nologo=true&seed=522',
        'https://image.pollinations.ai/prompt/organic%20honey%20close%20up%2C%20golden%20texture?width=800&height=600&nologo=true&seed=523',
        'https://image.pollinations.ai/prompt/organic%20honey%20in%20jar%2C%20natural%20sweetener?width=800&height=600&nologo=true&seed=524'
      ],
      description: 'Unprocessed raw honey rich in enzymes and antioxidants',
      inStock: true,
      discount: 16,
      tags: ['natural', 'antioxidants', 'raw', 'spring'],
      weight: '500g',
      seasonal: true,
      season: 'spring'
    },
    // Seasonal Products - Summer
    {
      _id: 'summer-1',
      name: 'Fresh Watermelon',
      category: 'fruits',
      price: 120,
      originalPrice: 150,
      rating: 5,
      reviews: 234,
      image: 'https://image.pollinations.ai/prompt/fresh%20organic%20watermelon%20sliced%20open%2C%20bright%20red%20flesh%2C%20green%20rind%2C%20juicy%20summer%20fruit%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=529',
      images: [
        'https://image.pollinations.ai/prompt/fresh%20organic%20watermelon%20sliced%20open%2C%20bright%20red%20flesh%2C%20green%20rind%2C%20juicy%20summer%20fruit%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=529',
        'https://image.pollinations.ai/prompt/fresh%20watermelon%20close%20up%2C%20juicy%20red%20flesh?width=800&height=600&nologo=true&seed=530',
        'https://image.pollinations.ai/prompt/fresh%20watermelon%20slices%2C%20summer%20fruit?width=800&height=600&nologo=true&seed=531'
      ],
      description: 'Juicy summer watermelon rich in hydration and vitamins',
      inStock: true,
      discount: 20,
      tags: ['fruits', 'organic', 'summer', 'hydration'],
      weight: '2 kg',
      seasonal: true,
      season: 'summer'
    },
    {
      _id: 'summer-2',
      name: 'Fresh Cucumber',
      category: 'vegetables',
      price: 60,
      originalPrice: 75,
      rating: 5,
      reviews: 123,
      image: 'https://image.pollinations.ai/prompt/fresh%20organic%20cucumbers%20on%20wooden%20board%2C%20crisp%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=530',
      images: [
        'https://image.pollinations.ai/prompt/fresh%20organic%20cucumbers%20on%20wooden%20board%2C%20crisp%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=530',
        'https://image.pollinations.ai/prompt/fresh%20cucumbers%20close%20up%2C%20crisp%20green?width=800&height=600&nologo=true&seed=531',
        'https://image.pollinations.ai/prompt/fresh%20cucumbers%20in%20basket%2C%20summer%20vegetables?width=800&height=600&nologo=true&seed=532'
      ],
      description: 'Crisp and refreshing organic cucumbers',
      inStock: true,
      discount: 20,
      tags: ['vegetables', 'organic', 'summer', 'refreshing'],
      weight: '500g',
      seasonal: true,
      season: 'summer'
    },
    {
      _id: 'summer-3',
      name: 'Organic Whole Milk',
      category: 'dairy',
      price: 70,
      originalPrice: 85,
      rating: 5,
      reviews: 210,
      image: 'https://image.pollinations.ai/prompt/glass%20bottle%20of%20organic%20whole%20milk%2C%20minimal%20aesthetic%2C%20soft%20natural%20lighting%2C%20condensation%2C%20studio%20photography?width=800&height=600&nologo=true&seed=523',
      images: [
        'https://image.pollinations.ai/prompt/glass%20bottle%20of%20organic%20whole%20milk%2C%20minimal%20aesthetic%2C%20soft%20natural%20lighting%2C%20condensation%2C%20studio%20photography?width=800&height=600&nologo=true&seed=523',
        'https://image.pollinations.ai/prompt/organic%20milk%20close%20up%2C%20creamy%20texture?width=800&height=600&nologo=true&seed=524',
        'https://image.pollinations.ai/prompt/organic%20milk%20in%20glass%2C%20fresh%20dairy?width=800&height=600&nologo=true&seed=525'
      ],
      description: 'Creamy whole milk perfect for summer',
      inStock: true,
      discount: 18,
      tags: ['dairy', 'organic', 'summer', 'calcium'],
      weight: '1L',
      seasonal: true,
      season: 'summer'
    },
    {
      _id: 'summer-4',
      name: 'Cold-Pressed Coconut Oil',
      category: 'natural',
      price: 280,
      originalPrice: 330,
      rating: 5,
      reviews: 149,
      image: 'https://image.pollinations.ai/prompt/clear%20bottle%20of%20cold%20pressed%20organic%20coconut%20oil%2C%20coconut%20halves%2C%20clean%20minimal%20scene%2C%20soft%20light?width=800&height=600&nologo=true&seed=524',
      images: [
        'https://image.pollinations.ai/prompt/clear%20bottle%20of%20cold%20pressed%20organic%20coconut%20oil%2C%20coconut%20halves%2C%20clean%20minimal%20scene%2C%20soft%20light?width=800&height=600&nologo=true&seed=524',
        'https://image.pollinations.ai/prompt/organic%20coconut%20oil%20close%20up%2C%20pure%20oil?width=800&height=600&nologo=true&seed=525',
        'https://image.pollinations.ai/prompt/organic%20coconut%20oil%20in%20bottle%2C%20natural%20oil?width=800&height=600&nologo=true&seed=526'
      ],
      description: 'Pure coconut oil for summer wellness',
      inStock: true,
      discount: 15,
      tags: ['natural', 'cold-pressed', 'healthy-fats', 'summer'],
      weight: '500ml',
      seasonal: true,
      season: 'summer'
    },
    // Seasonal Products - Monsoon
    {
      _id: 'monsoon-1',
      name: 'Fresh Mushrooms',
      category: 'vegetables',
      price: 140,
      originalPrice: 175,
      rating: 5,
      reviews: 67,
      image: 'https://image.pollinations.ai/prompt/fresh%20organic%20mushrooms%20on%20wooden%20board%2C%20brown%20and%20white%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=532',
      images: [
        'https://image.pollinations.ai/prompt/fresh%20organic%20mushrooms%20on%20wooden%20board%2C%20brown%20and%20white%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=532',
        'https://image.pollinations.ai/prompt/fresh%20mushrooms%20close%20up%2C%20organic%20varieties?width=800&height=600&nologo=true&seed=533',
        'https://image.pollinations.ai/prompt/fresh%20mushrooms%20in%20basket%2C%20monsoon%20vegetables?width=800&height=600&nologo=true&seed=534'
      ],
      description: 'Protein-rich mushrooms perfect for monsoon',
      inStock: true,
      discount: 20,
      tags: ['vegetables', 'organic', 'monsoon', 'protein'],
      weight: '250g',
      seasonal: true,
      season: 'monsoon'
    },
    {
      _id: 'monsoon-2',
      name: 'Organic Brown Rice',
      category: 'grains',
      price: 140,
      originalPrice: 170,
      rating: 5,
      reviews: 187,
      image: 'https://image.pollinations.ai/prompt/organic%20brown%20rice%20grains%20in%20a%20bowl%2C%20earthy%20tones%2C%20natural%20light%2C%20high%20detail?width=800&height=600&nologo=true&seed=525',
      images: [
        'https://image.pollinations.ai/prompt/organic%20brown%20rice%20grains%20in%20a%20bowl%2C%20earthy%20tones%2C%20natural%20light%2C%20high%20detail?width=800&height=600&nologo=true&seed=525',
        'https://image.pollinations.ai/prompt/organic%20brown%20rice%20close%20up%2C%20whole%20grain?width=800&height=600&nologo=true&seed=526',
        'https://image.pollinations.ai/prompt/organic%20brown%20rice%20cooked%2C%20healthy%20grain?width=800&height=600&nologo=true&seed=527'
      ],
      description: 'Fiber-rich brown rice for monsoon comfort',
      inStock: true,
      discount: 18,
      tags: ['grains', 'fiber', 'whole-grain', 'monsoon'],
      weight: '1kg',
      seasonal: true,
      season: 'monsoon'
    },
    {
      _id: 'monsoon-3',
      name: 'Organic Paneer',
      category: 'dairy',
      price: 95,
      originalPrice: 120,
      rating: 5,
      reviews: 98,
      image: 'https://image.pollinations.ai/prompt/fresh%20organic%20paneer%20cubes%20on%20a%20plate%2C%20soft%20texture%2C%20bright%20clean%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=526',
      images: [
        'https://image.pollinations.ai/prompt/fresh%20organic%20paneer%20cubes%20on%20a%20plate%2C%20soft%20texture%2C%20bright%20clean%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=526',
        'https://image.pollinations.ai/prompt/organic%20paneer%20close%20up%2C%20fresh%20cheese?width=800&height=600&nologo=true&seed=527',
        'https://image.pollinations.ai/prompt/organic%20paneer%20in%20curry%2C%20traditional%20dish?width=800&height=600&nologo=true&seed=528'
      ],
      description: 'Fresh high-protein paneer for monsoon meals',
      inStock: true,
      discount: 21,
      tags: ['dairy', 'protein', 'fresh', 'monsoon'],
      weight: '200g',
      seasonal: true,
      season: 'monsoon'
    },
    // Seasonal Products - Winter
    {
      _id: 'winter-1',
      name: 'Winter Squash',
      category: 'vegetables',
      price: 160,
      originalPrice: 200,
      rating: 5,
      reviews: 134,
      image: 'https://image.pollinations.ai/prompt/organic%20winter%20squash%20on%20wooden%20board%2C%20orange%20and%20green%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=533',
      images: [
        'https://image.pollinations.ai/prompt/organic%20winter%20squash%20on%20wooden%20board%2C%20orange%20and%20green%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=533',
        'https://image.pollinations.ai/prompt/organic%20winter%20squash%20close%20up%2C%20hearty%20vegetable?width=800&height=600&nologo=true&seed=534',
        'https://image.pollinations.ai/prompt/organic%20winter%20squash%20in%20basket%2C%20winter%20vegetables?width=800&height=600&nologo=true&seed=535'
      ],
      description: 'Hearty winter squash for warming meals',
      inStock: true,
      discount: 20,
      tags: ['vegetables', 'organic', 'winter', 'hearty'],
      weight: '1 kg',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 'winter-2',
      name: 'Rolled Oats',
      category: 'grains',
      price: 180,
      originalPrice: 210,
      rating: 5,
      reviews: 121,
      image: 'https://image.pollinations.ai/prompt/organic%20rolled%20oats%20in%20bowl%20with%20spoon%2C%20cozy%20breakfast%20aesthetic%2C%20high%20detail?width=800&height=600&nologo=true&seed=527',
      images: [
        'https://image.pollinations.ai/prompt/organic%20rolled%20oats%20in%20bowl%20with%20spoon%2C%20cozy%20breakfast%20aesthetic%2C%20high%20detail?width=800&height=600&nologo=true&seed=527',
        'https://image.pollinations.ai/prompt/organic%20oats%20close%20up%2C%20whole%20grain?width=800&height=600&nologo=true&seed=528',
        'https://image.pollinations.ai/prompt/organic%20oats%20cooked%2C%20warm%20breakfast?width=800&height=600&nologo=true&seed=529'
      ],
      description: 'Wholesome breakfast oats for winter mornings',
      inStock: true,
      discount: 14,
      tags: ['grains', 'fiber', 'breakfast', 'winter'],
      weight: '1kg',
      seasonal: true,
      season: 'winter'
    },
    {
      _id: 'winter-3',
      name: 'Raw Almonds',
      category: 'natural',
      price: 420,
      originalPrice: 480,
      rating: 5,
      reviews: 256,
      image: 'https://image.pollinations.ai/prompt/raw%20organic%20almonds%20in%20bowl%2C%20top-down%2C%20clean%20background%2C%20studio%20lighting%2C%20high%20detail?width=800&height=600&nologo=true&seed=528',
      images: [
        'https://image.pollinations.ai/prompt/raw%20organic%20almonds%20in%20bowl%2C%20top-down%2C%20clean%20background%2C%20studio%20lighting%2C%20high%20detail?width=800&height=600&nologo=true&seed=528',
        'https://image.pollinations.ai/prompt/organic%20almonds%20close%20up%2C%20nutritious%20nuts?width=800&height=600&nologo=true&seed=529',
        'https://image.pollinations.ai/prompt/organic%20almonds%20in%20bowl%2C%20winter%20snacks?width=800&height=600&nologo=true&seed=530'
      ],
      description: 'Vitamin E rich almonds for winter nutrition',
      inStock: true,
      discount: 12,
      tags: ['natural', 'nuts', 'vitamin-e', 'winter'],
      weight: '500g',
      seasonal: true,
      season: 'winter'
    }
  ]
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch from API first
        const response = await productAPI.getProduct(id)
        setProduct(response.data.product)
      } catch (err) {
        console.error('Error fetching product from API:', err)
        
        // Fallback to sample products
        const sampleProduct = sampleProducts.find(p => p._id.toString() === id)
        if (sampleProduct) {
          setProduct(sampleProduct)
          console.log('Using sample product data as fallback')
        } else {
          setError('Product not found')
          toast.error('Product not found')
        }
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchProduct()
    }
  }, [id])
  
  // Sync local wishlist state
  useEffect(() => {
    if (product) {
      setLocalWishlistState(isInWishlist(product._id))
    }
  }, [isInWishlist, product?._id])
  
  const isProductInWishlist = localWishlistState !== null ? localWishlistState : isInWishlist(product?._id)
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 20) {
      setQuantity(newQuantity)
    }
  }
  
  const handleAddToCartClick = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }))
    }
  }
  
  const handleWishlist = () => {
    if (product) {
      // Toggle local state for immediate feedback
      const currentState = isProductInWishlist
      setLocalWishlistState(!currentState)
      toggleWishlist(product)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
        <div className="text-center py-12">
          <div className="text-4xl mb-4">😕</div>
          <h3 className="text-xl font-heading text-green-800 mb-2">Product not found</h3>
          <p className="text-gray-600 font-body mb-6">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.images?.[selectedImage] || product.image || aiImageUrl('organic product placeholder', 800, 600, 1)}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = aiImageUrl('organic product placeholder', 800, 600, 1)
              }}
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-green-500' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isProductInWishlist 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-red-500'
                }`}
                title={isProductInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isProductInWishlist ? 'fill-current' : ''
                  }`} 
                />
              </button>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.seasonal && (
                <SeasonalBadge season={product.season} />
              )}
              {product.discount && (
                <Badge variant="discount">
                  -{product.discount}% OFF
                </Badge>
              )}
              {product.bulkDiscount && (
                <Badge variant="discount" className="bg-blue-100 text-blue-800 border-blue-200">
                  Bulk {product.bulkDiscount.discountPercent}% OFF
                </Badge>
              )}
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.bulkDiscount && (
              <p className="text-sm text-blue-600">
                Buy {product.bulkDiscount.minQty}+ items and get {product.bulkDiscount.discountPercent}% off!
              </p>
            )}
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Weight */}
          {product.weight && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Weight</h3>
              <p className="text-gray-600">{product.weight}</p>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="text-lg font-semibold text-gray-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 20}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <Button
              onClick={handleAddToCartClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            
            <p className="text-sm text-gray-500 text-center">
              All users can add items to their cart.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail


