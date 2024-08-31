import { getPostList } from "@/data/postData";

export default async function ServerTest() {
  const data = await getPostList();
  return <div>{data.count}</div>;
}
