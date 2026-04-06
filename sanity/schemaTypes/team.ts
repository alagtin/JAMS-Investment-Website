export default {
  name: 'team',
  title: '團隊成員',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
      type: 'string',
    },
    {
      name: 'role',
      title: '職稱',
      type: 'string',
    },
    {
      name: 'school',
      title: '畢業學校 (例如: National Taiwan University)',
      type: 'string',
    },
    {
      name: 'linkedinUrl',
      title: '領英連結 (LinkedIn URL)',
      type: 'url',
    },
    {
      name: 'image',
      title: '照片',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'order',
      title: '排序權重 (填 1 代表最前面)',
      type: 'number',
      initialValue: 100,
    },
  ],
}