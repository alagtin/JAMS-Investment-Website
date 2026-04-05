"use client" // 絕對要有這一行，因為 Studio 是純客戶端應用

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config' // 確保路徑對準根目錄的 config

export default function StudioPage() {
  return <NextStudio config={config} />
}