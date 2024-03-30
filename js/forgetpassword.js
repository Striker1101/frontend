const api = "https://admin.coinpeckko.online/api/";
// const api = "http://127.0.0.1:8000/api/";
const form = document.getElementById("sbmt");

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

form.addEventListener("click", async function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;

  //login user
  resetPassword(email);
});

async function resetPassword(email) {
  const data = { email };

  try {
    const response = await fetch(`${api}auth/reset-password`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.message == "reset successful") {
      alert("please check your email, reset link was sent")
    } else {
      alert("Error: " + result.message);
      window.location.href = "signin.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
