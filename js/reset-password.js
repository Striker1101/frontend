const api = "https://admin.coinpeckko.online/api";
// const api = "http://127.0.0.1:8000/api";
const form = document.getElementById("sbmt");

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

function extractTokenAndEmailFromUrl(url) {
  // Create a new URL object with the provided URL
  const urlObj = new URL(url);

  // Extract the token from the query parameters
  const token = urlObj.searchParams.get("token");

  // Extract the email from the query parameters
  const email = urlObj.searchParams.get("email");

  // Decode the email if needed
  const decodedEmail = decodeURIComponent(email);

  return { token, email: decodedEmail };
}

form.addEventListener("click", async function (e) {
  e.preventDefault();
  const url = window.location.href;

  let token = document.getElementById("token").value;
  token = extractTokenAndEmailFromUrl(url).token;

  let email = document.getElementById("email").value;
  email = extractTokenAndEmailFromUrl(url).email;
  //get torken and email from query

  let password = document.getElementById("password").value;
  let cpassword = document.getElementById("cpassword").value;

  if (password == cpassword && token && email) {
    //confirm user
    confirm(email, token, password);
  } else {
    return alert("password must be same as confirm password");
  }
});

async function confirm(email, token, password) {
  const data = { email, token, password, password_confirmation: password };

  try {
    const response = await fetch(`${api}/auth/password/reset/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    alert(result.message);
    window.location.href = "signin.html";
  } catch (error) {
    console.error(error);
  }
}
