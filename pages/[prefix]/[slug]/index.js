import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { checkSlugHasOneSlash, processPostData } from '@/lib/utils/post'
import { idToUuid } from 'notion-utils'
import Slug from '..'

/**
 * 根据notion的slug访问页面
 * 解析二级目录 /article/about
 * @param {*} props
 * @returns
 */
const PrefixSlug = props => {
  return <Slug {...props} />
}

export async function getStaticPaths() {
  // 开发环境或启用跳过构建时，不预生成任何页面
  if (!BLOG.isProd || process.env.SKIP_BUILD_STATIC_GENERATION === 'true') {
    return {
      paths: [],
      fallback: 'blocking'  // ← 改为 'blocking' 确保 SEO 友好
    }
  }

  const from = 'slug-paths'
  const { allPages } = await getGlobalData({ from })

  // 只预生成最近的 50 篇文章（可通过环境变量控制）
  const preGenerateCount = parseInt(process.env.PRE_GENERATE_POSTS_COUNT || '50', 10)
  
  const paths = allPages
    ?.filter(row => checkSlugHasOneSlash(row))
    .slice(0, preGenerateCount)  // ← 只取前 N 篇
    .map(row => ({
      params: { prefix: row.slug.split('/')[0], slug: row.slug.split('/')[1] }
    }))

  return {
    paths: paths,
    fallback: 'blocking'  // ← 改为 'blocking' 确保首次访问时按需生成
  }
}

export async function getStaticProps({ params: { prefix, slug }, locale }) {
  const fullSlug = prefix + '/' + slug
  const from = `slug-props-${fullSlug}`
  const props = await getGlobalData({ from, locale })

  // 在列表内查找文章
  props.post = props?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === slug || p.slug === fullSlug || p.id === idToUuid(fullSlug))
    )
  })

  // 处理非列表内文章的内信息
  if (!props?.post) {
    const pageId = slug.slice(-1)[0]
    if (pageId.length >= 32) {
      const post = await getPost(pageId)
      props.post = post
    }
  }

  if (!props?.post) {
    // 无法获取文章
    props.post = null
  } else {
    await processPostData(props, from)
  }
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default PrefixSlug
