async function deleteUser(username) {
  if (confirm(`Are you sure you want to delete ${username}?`)) {
    const wasDeleted = await fetch(`/users/${username}`, {
      method: "DELETE",
    });

    if (wasDeleted) {
      location.reload();
      alert(`${username} was deleted.`);
    } else alert(`Couldn't delete ${username}.`);
  }
}
