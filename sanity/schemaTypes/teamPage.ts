// sanity/schemaTypes/teamPage.ts
export default {
  name: 'teamPage',
  title: 'TEAMS 頁面視覺管理',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '頁面主標題',
      type: 'string',
      initialValue: 'Our Team',
    },
    {
      name: 'heroImage',
      title: 'TEAMS 首頁全螢幕背景圖',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}