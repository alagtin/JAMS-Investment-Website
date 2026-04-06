export default {
  name: 'dip',
  title: 'DIP 計畫管理',
  type: 'document',
  fields: [
    // --- Hero Section ---
    {
      name: 'mainLogo',
      title: 'Hero Section 大 Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'backgroundType',
      title: '背景類型 (照片或影片)',
      type: 'string',
      options: {
        list: [
          { title: '照片 (Image)', value: 'image' },
          { title: '影片 (Video)', value: 'video' },
        ],
      },
      initialValue: 'image',
    },
    {
      name: 'backgroundImage',
      title: '全版背景照片',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.backgroundType !== 'image',
    },
    {
      name: 'backgroundVideo',
      title: '全版背景影片 (請上傳 MP4)',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.backgroundType !== 'video',
    },

    // --- 錄取數據 (Selections Section) ---
    {
      name: 'admittedCount',
      title: '錄取人數 (例如: 15)',
      type: 'number',
    },
    {
      name: 'admissionRate',
      title: '錄取率 (例如: 9%)',
      type: 'string',
    },
    {
      name: 'totalApplicants',
      title: '申請總人數 (例如: 165)',
      type: 'number',
    },

    // --- Logo 牆區塊 ---
    {
      name: 'uniLogos',
      title: '錄取學員學校 Logo 牆',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'mentorLogos',
      title: 'Mentor 公司 Logo 牆',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'speakerLogos',
      title: 'Guest Speaker 公司 Logo 牆',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
}