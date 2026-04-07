export default {
  name: 'homepage',
  title: '首頁門面管理',
  type: 'document',
  fields: [
    // --- 第一卡：JAMS INVESTMENT ---
    {
      name: 'jamsSection',
      title: '第一卡：JAMS INVESTMENT (Link to ABOUT)',
      type: 'object',
      fields: [
        { name: 'logo', title: 'JAMS 大 Logo', type: 'image', options: { hotspot: true } },
        {
          name: 'bgType',
          title: '背景類型',
          type: 'string',
          options: { list: [{ title: '照片', value: 'image' }, { title: '影片', value: 'video' }] },
          initialValue: 'image'
        },
        { name: 'bgImage', title: '背景照片', type: 'image', hidden: ({ parent }) => parent?.bgType !== 'image' },
        { name: 'bgVideo', title: '背景影片 (MP4)', type: 'file', hidden: ({ parent }) => parent?.bgType !== 'video' },
      ]
    },
    // --- 第二卡：DIP PROGRAM ---
    {
      name: 'dipSection',
      title: '第二卡：DIP PROGRAM (Link to DIP)',
      type: 'object',
      fields: [
        { name: 'logo', title: 'DIP 大 Logo', type: 'image', options: { hotspot: true } },
        {
          name: 'bgType',
          title: '背景類型',
          type: 'string',
          options: { list: [{ title: '照片', value: 'image' }, { title: '影片', value: 'video' }] },
          initialValue: 'image'
        },
        { name: 'bgImage', title: '背景照片', type: 'image', hidden: ({ parent }) => parent?.bgType !== 'image' },
        { name: 'bgVideo', title: '背景影片 (MP4)', type: 'file', hidden: ({ parent }) => parent?.bgType !== 'video' },
      ]
    }
  ]
}