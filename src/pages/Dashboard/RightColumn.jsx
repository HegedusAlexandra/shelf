import React from 'react'
import { useLanguageNav } from '../../contexts/LanguageContext'
import CalendarSide from '../../components/CalendarSide'
import StockSide from '../../components/StockSide'
import RecipeSide from '../../components/RecipeSide'

export default function RightColumn() {
const {currentNavigation} = useLanguageNav()

  return (
    <div className="flex-1 h-[100%]">
    {currentNavigation === "main" && <CalendarSide />}
      {currentNavigation === "stock" && <StockSide />}
      {currentNavigation === "recipe" && <RecipeSide />}
    </div>
  )
}
