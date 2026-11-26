const defaultTechLogos = {
  'Microsoft 365': 'microsoft.svg',
  Azure: 'microsoftazure.svg',
  'Microsoft Outlook': 'logo-outlook.png',
  'Google Workspace': 'logo-google.png',
  'Google Cloud': 'logo-google-cloud.png',
  Gmail: 'logo-gmail.png',
  AWS: 'logo-aws.png',
  GitHub: 'github.svg',
  OpenAI: 'logo-openai.png',
  Supabase: 'logo-supabase.png',
  'C# / .NET': 'csharp.svg',
  Linux: 'linux.svg',
} as const

export const techLogos = {
  ...defaultTechLogos,
  Vue: 'vue.svg',
  Airtable: 'logo-airtable.svg',
} as const

export type Technology = keyof typeof techLogos
export const defaultTechnologies = Object.keys(defaultTechLogos) as (keyof typeof defaultTechLogos)[]
