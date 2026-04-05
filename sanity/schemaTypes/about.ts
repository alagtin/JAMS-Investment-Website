export default {
  name: 'about',
  title: 'ABOUT 頁面管理',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: '頁面標題 (內部識別用)',
    },
    {
      name: 'heroVideo',
      type: 'file',
      title: '首頁全螢幕背景影片',
      description: '請上傳 15 秒內的影片檔',
      options: { accept: 'video/*' }
    },
    {
      name: 'mainLogo',
      type: 'image',
      title: '中間懸浮 Logo',
      options: { hotspot: true }
    }
  ]
}