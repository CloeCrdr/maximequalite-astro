// public/js/contact-form.js
function showModal(message) {
    const modal = document.getElementById("form-modal");
    const messageElement = document.getElementById("modal-message");
    const closeButton = document.querySelector(".modal-close");
  
    if (!modal || !messageElement || !closeButton) return;
  
    messageElement.textContent = message;
    modal.classList.remove("hidden");
  
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 5000);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;
  
    let modalTranslations = {
      success: "✅ Message envoyé !",
      error: "❌ Une erreur est survenue.",
      technical: "⚠️ Erreur technique."
    };
  
    const json = document.getElementById("translations-json")?.textContent;
    if (json) {
      try {
        modalTranslations = JSON.parse(json);
      } catch (e) {
        console.warn("⚠️ Problème de parsing JSON", e);
      }
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch("/api/send-contact", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.success) {
          showModal(modalTranslations.success);
          form.reset();
        } else {
          showModal(modalTranslations.error);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        showModal(modalTranslations.technical);
      }
    });
  });
  