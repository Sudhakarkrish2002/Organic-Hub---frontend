import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchSeasonalProducts, setCurrentSeason } from '@/store/slices/seasonalSlice'
import { getCurrentSeason } from '@/utils/seasonDetector'

const useSeasonal = () => {
  const dispatch = useDispatch()
  const { currentSeason, seasonalProducts, featuredSeasonal, loading, error } = useSelector((state) => state.seasonal)
  
  useEffect(() => {
    const detectedSeason = getCurrentSeason()
    if (currentSeason !== detectedSeason) {
      dispatch(setCurrentSeason(detectedSeason))
    }
    dispatch(fetchSeasonalProducts(currentSeason))
  }, [dispatch, currentSeason])
  
  const loadSeasonalProducts = (season) => {
    dispatch(fetchSeasonalProducts(season))
  }
  
  const changeSeason = (season) => {
    dispatch(setCurrentSeason(season))
    dispatch(fetchSeasonalProducts(season))
  }
  
  return {
    currentSeason,
    seasonalProducts,
    featuredSeasonal,
    loading,
    error,
    loadSeasonalProducts,
    changeSeason,
  }
}

export default useSeasonal;