async function logout() {
  if (!confirm("Are you sure you want to log out?")) return;
  try {
    const success = await fetch("/logout");

    if (!success.ok) throw new Error("Couldn't logout. Try again later.");

    alert(`You've logged out successfully.`);
    location.reload();
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
