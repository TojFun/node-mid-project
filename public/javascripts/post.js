async function post(userData, link) {
  res = await fetch(link, {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return res;
}
