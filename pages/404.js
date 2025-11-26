import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { DynamicLayout } from '@/themes/theme'

const NoFound = () => {
  // 安全的最小化配置
  const NOTION_CONFIG = { THEME: BLOG.THEME }
  const theme = siteConfig('THEME', BLOG.THEME, NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='Layout404' />
}

export default NoFound
