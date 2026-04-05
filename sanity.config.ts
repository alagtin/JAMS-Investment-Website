import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes' // 確保 sanity 資料夾在最外面

export default defineConfig({
  name: 'default',
  title: 'JAMS Backend',
  projectId: 'hpph885a',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})