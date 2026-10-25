
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
  window.supabaseClient =
    supabaseClient;

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
document.getElementById("loginEmail")
document.getElementById("loginPassword")

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
async function adminLogin() {
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (!emailInput || !passwordInput) {
alert("Admin login fields were not found.");
return;
}

if (!window.supabaseClient) {
alert("Supabase did not load. Please check script.js.");
return;
}

const email = emailInput.value.trim();
const password = passwordInput.value;

if (!email || !password) {
alert("Enter your admin email and password.");
return;
}

const button = document.querySelector(
'button[onclick="adminLogin()"]'
);

if (button) {
button.disabled = true;
button.textContent = "Signing in...";
}

try {
const { data, error } =
await window.supabaseClient.auth.signInWithPassword({
email,
password
});

if (error) {  
  alert("Login failed: " + error.message);  
  return;  
}  

if (!data.session) {  
  alert("Login failed: no active session was returned.");  
  return;  
}  

alert("Admin authentication successful!");  

// Keep the admin page open after successful login.  
// We will connect product publishing after testing authentication.

} catch (error) {
alert("An error occurred: " + error.message);
} finally {
if (button) {
button.disabled = false;
button.textContent = "Sign In";
}
}
}

async function publishProduct() {
  const name = document.getElementById("product")?.value.trim();
  const priceValue = document.getElementById("price")?.value;
  const description =
    document.getElementById("description")?.value.trim() || "";
  const photoInput = document.getElementById("photo");
  const file = photoInput?.files?.[0];

  const supabase = window.supabaseClient;

  if (!supabase) {
    alert("Supabase is not connected. Check script.js.");
    return;
  }

  if (!name || !priceValue || Number(priceValue) <= 0) {
    alert("Enter a product name and a valid price.");
    return;
  }

  if (!file) {
    alert("Please select a product photo.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Please choose an image smaller than 5 MB.");
    return;
  }

  const button = document.querySelector(
    'button[onclick="publishProduct()"]'
  );

  if (button) {
    button.disabled = true;
    button.textContent = "Publishing...";
  }

  let uploadedPath = null;

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath =
      Date.now() + "-" + safeName;

          img.style.display = "block";
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.objectFit = "cover";

      img.onerror = function () {
        console.error(
          "Product image failed to load:",
          product.image_url
        );
        img.alt = "Image unavailable";
      };

      img.src = Product.image_url;

      const info = document.createElement("div");
      info.className = "collection-info";

      const title = document.createElement("h3");
      title.textContent = product.name || "";

      const price = document.createElement("p");
      price.textContent =
        "₦" + Number(product.price).toLocaleString("en-NG");

      const description = document.createElement("p");
      description.textContent = product.description || "";

      const order = document.createElement("a");
      order.href = "#contact-us";
      order.textContent = "Enquire on WhatsApp ↗";

      order.addEventListener("click", (event) => {
        event.preventDefault();
        openWhatsApp(
          "Hello Jewel Fashion Designer Venture, I am interested in " +
          product.name + ". Please share more details."
        );
      });

      info.append(title, price, description, order);
      card.append(img// Upload the image to Supabase Storage.
    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("product_images")
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type
        });

    if (uploadError) {
      throw new Error("Photo upload failed: " + uploadError.message);
    }

    uploadedPath = uploadData.path;

    // Get the URL for displaying the uploaded image.
    const { data: urlData } = supabase.storage
      .from("product_images")
      .getPublicUrl(uploadedPath);

    const imageUrl = urlData.publicUrl;

    // Save product details to the existing Product table.
    
const { error: insertError } = await supabase
  .from("Product")
  .insert([{
    name: name,
    price: Number(priceValue),
    description: description,
    image_url: imageUrl
  }]);


    if (insertError) {
      throw new Error(
        "Photo uploaded, but saving the product failed: " +
        insertError.message
      );
    }

    alert("Product published successfully!");

    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    photoInput.value = "";

  } catch (error) {
    alert(error.message || "Something went wrong while publishing.");

  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Add Product";
    }
  }
}

async function loadPublishedProducts() {
  const container = document.getElementById("live-products");
  const loading = document.getElementById("products-loading");
  const message = document.getElementById("products-message");

  // Run only on the main website.
  if (!container) return;

  try {
    const { data: products, error } = await window.supabaseClient
      .from("Product")
      .select("name, price, description, image_url")
      .order("name", { ascending: true });

    if (error) throw error;

    if (loading) loading.hidden = true;

    if (!products || products.length === 0) {
      if (message) {
        message.textContent = "New designs will be available soon.";
      }
      return;
    }

    container.replaceChildren();

    if (message) message.textContent = "";

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "collection-card";

      const img = document.createElement("img");
      img.alt = product.name || "Jewel fashion design";
      img.loading = "lazy";
, info);
      container.append(card);
    });

  } catch (error) {
    if (loading) loading.hidden = true;

    if (message) {
      message.textContent =
        "We couldn't load our latest designs right now.";
    }

    console.error("Product loading failed:", error.message);
  }
  }
  
loadPublishedProducts();

document.getElementById("outfitOrderForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  alert("The order form is working.");

  const name = document.getElementById("orderName").value.trim();
  const budget = document.getElementById("orderBudget").value;
  const address = document.getElementById("orderAddress").value.trim();
  const outfit = document.getElementById("orderOutfit").value.trim();

  const message =
    "NEW OUTFIT ORDER - FITS WITH JADE\n\n" +
    "Customer name: " + name + "\n" +
    "Budget: ₦" + budget + "\n" +
    "Delivery address: " + address + "\n" +
    "Outfit requested: " + outfit;

  openWhatsApp(message);
});

function openWhatsApp(message) {
    const phoneNumber = "2348012345678";
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
                        }

