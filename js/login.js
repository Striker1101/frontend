const api = "https://admin.coinpecko.online/api/";
// const api = "http://127.0.0.1:8000/api/";
const form = document.getElementById("sbmt");

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Check if the URL contains the 'email' and 'password' parameters
if (urlParams.has("email") && urlParams.has("password")) {
  // Get the values of 'email' and 'password'
  const email = urlParams.get("email");
  const password = urlParams.get("password");

  // Use the email and password values as needed
  console.log("Email:", email);
  console.log("Password:", password);

  // Example: Log in with the extracted email and password
  loginUser(email, password);
} else {
  // Handle the case when the URL parameters are not present
  console.log("Email and/or password not provided in the URL.");
}

form.addEventListener("click", async function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //login user
  loginUser(email, password);
});

async function loginUser(email, password) {
  const data = { email, password };

  try {
    const response = await fetch(`${api}auth/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.message == "Login successful") {
      window.location.href = "dashboard/index.html";
      localStorage.setItem("user", JSON.stringify(result));
    } else {
      alert("Error: " + result.message);
      window.location.href = "signin.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
