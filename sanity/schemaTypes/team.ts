export default {
  name: 'team',
  title: '團隊成員管理',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '成員姓名',
      type: 'string',
    },
    {
      name: 'role',
      title: '職稱',
      type: 'string',
    },
    {
      name: 'image',
      title: '照片',
      type: 'image',
      options: { hotspot: true }, // 讓你在後台可以直接裁切臉部中心
    },
    {
      name: 'education',
      title: '就讀/畢業學校',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1).max(2).error('請填寫至少一個、最多兩個學校'),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn 連結',
      type: 'url',
    },
    {
      name: 'bio',
      title: '短自我介紹',
      type: 'text',
      rows: 3,
    },
  ],
}