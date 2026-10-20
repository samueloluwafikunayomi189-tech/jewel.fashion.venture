
/*
  JEWEL FASHION DESIGNER VENTURE
  Add the WhatsApp number when you are ready:
  Use country code, digits only, without + or spaces.
  Example for Nigeria: 2348012345678
*/

const SUPABASE_URL = "https://bzqfnvryzmwidqthptmr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JKc42ZuJpaHIWXFk0K4I9g_QzqVo1xU";
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
window.supabaseClient = supabaseClient;
const WHATSAPP_NUMBER = "+234 906 423 8417";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

function openWhatsApp(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const url = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {
  whatsappButton.addEventListener("click", () => {
    openWhatsApp("Hello Jewel Fashion Designer Venture, I would like to make an enquiry about your fashion designs.");
  });
}

document.querySelectorAll("[data-order]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const style = link.getAttribute("data-order");
    openWhatsApp("Hello Jewel Fashion Designer Venture, I am interested in your " + style + " collection. Please share more details.");
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    loginMessage.textContent = "Signing in...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      loginMessage.textContent = "Login failed: " + error.message;
      return;
    }

    loginMessage.textContent = "Login successful!";

    window.location.href = "admin.html";
  });
                 }
