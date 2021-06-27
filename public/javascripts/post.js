async function post(userData, link) {
  const res = await fetch(link, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return res;
}
