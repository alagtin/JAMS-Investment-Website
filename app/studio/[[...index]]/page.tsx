"use client" // 這行絕對不能少！

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config' 

export default function StudioPage() {
  // 檢查這裡：NextStudio 組件必須正確包裹 config
  return <NextStudio config={config} />
}