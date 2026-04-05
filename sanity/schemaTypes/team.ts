// sanity/schemaTypes/team.ts
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
    // --- 新增這個排序欄位 ---
    {
      name: 'order',
      title: '排序權重 (越小越靠前)',
      type: 'number',
      initialValue: 100, // 預設值
    },
  ],
}