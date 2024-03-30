const api = "https://admin.coinpeckko.online/api";
// const api = "http://127.0.0.1:8000/api";
const form = document.getElementById("sbmt");

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

form.addEventListener("click", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  if (!email) {
    return alert("input the email, we would send you a link");
  }
  //login user
  sendEmail(email);
});

async function sendEmail(email) {
  const data = { email };

  try {
    const response = await fetch(`${api}/auth/password/email/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);
    if (result.status == 200) {
      alert("please check your email, reset link was sent");
      window.location.href = "signin.html";
    } else {
      alert("Error: " + result.message);
      window.location.href = "signin.html";
    }
  } catch (error) {
    console.error(error);
  }
}
