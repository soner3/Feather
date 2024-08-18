export async function getPostList() {
  const res = await fetch("http://nginx/posts/list/");
  const data: Array<string> = await res.json();
  return data;
}
