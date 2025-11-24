export default function Index({ message }) {
  return <div>{message || 'No message'}</div>;
}

export async function getStaticProps() {
  // 强制返回一个简单字符串，测试是否生效
  return {
    props: {
      message: '✅ 成功从 getStaticProps 加载数据！'
    }
  };
}
