/**
 * 调试用首页：显示从 Notion 获取的数据
 */
export default function Index(props) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
      <h1>🔍 Notion 数据调试页面</h1>
      <p>如果下面显示文章列表，说明 Notion 配置成功！</p>
      <hr />
      <h2>收到的数据：</h2>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      >
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

// 保留数据获取逻辑（不要动这部分！）
import { getGlobalData } from '@/lib/db/getSiteData';
import BLOG from '@/blog.config';
import { siteConfig } from '@/lib/config';

export async function getStaticProps(req) {
  const { locale } = req;
  const from = 'index';
  const props = await getGlobalData({ from, locale });

  // 过滤已发布的文章
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  );

  delete props.allPages; // 减小体积
  return { props };
}/**
 * 调试用首页：显示从 Notion 获取的数据
 */
export default function Index(props) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
      <h1>🔍 Notion 数据调试页面</h1>
      <p>如果下面显示文章列表，说明 Notion 配置成功！</p>
      <hr />
      <h2>收到的数据：</h2>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      >
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

// 保留数据获取逻辑（不要动这部分！）
import { getGlobalData } from '@/lib/db/getSiteData';
import BLOG from '@/blog.config';
import { siteConfig } from '@/lib/config';

export async function getStaticProps(req) {
  const { locale } = req;
  const from = 'index';
  const props = await getGlobalData({ from, locale });

  // 过滤已发布的文章
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  );

  delete props.allPages; // 减小体积
  return { props };
}
