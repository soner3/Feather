export async function getPostList() {
  const res = await fetch("http://nginx/posts/list/");
  const data = await res.json();
  console.log(data);
  return res.ok;
}
