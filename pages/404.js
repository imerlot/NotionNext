import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { DynamicLayout } from '@/themes/theme'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='Layout404' {...props} />
}

export async function getStaticProps({ locale }) {
  // 404页面通常不需要复杂的动态数据
  // 如果确实需要基础配置，可以保留最小化的数据获取
  // 否则可以直接返回空props
  
  // 方案1：如果需要基础站点配置（推荐）
  const NOTION_CONFIG = {
    THEME: BLOG.THEME,
    // 添加其他必要的基础配置
  }
  
  return { 
    props: { NOTION_CONFIG },
    revalidate: 36000 // ISR缓存10小时，减少不必要的重新生成
  }
}

export default NoFound
