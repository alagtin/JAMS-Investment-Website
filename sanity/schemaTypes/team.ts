export const team = {
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
      name: 'image',
      title: '照片',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'order',
      title: '排序權重 (填 1 代表最前面，越小越靠前)',
      type: 'number',
      initialValue: 100,
    },
  ],
}