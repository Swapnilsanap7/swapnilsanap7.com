import { MetadataRoute } from 'next'
import { PROJECTS_DATA } from '../lib/constants'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swapnilsanap7.com'
  
  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/access`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  const projectPages = Object.keys(PROJECTS_DATA).map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...projectPages]
}
