document.addEventListener("DOMContentLoaded", () => {

  // ANIMAÇÕES DE SCROLL

  const animated = document.querySelectorAll(".animate-fade-up, .animate-fade-left, .animate-fade-right");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("visible"));
  }

  // NAVBAR: EFEITO AO ROLAR

  const nav = document.querySelector(".navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // TOAST DE MENSAGEM (notificação visual)

  function showToast(msg, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-msg ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // FORMULÁRIO DE CONTATO

  const form = document.getElementById("formContato");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();
      const numero = "351913487587"; // número do WhatsApp

      if (!nome || !mensagem) {
        showToast("Por favor, preencha o nome e a mensagem antes de enviar.", "error");
        return;
      }

      // Montagem da mensagem
      let texto = `Olá Emerson, o meu nome é ${nome}. \n ${mensagem}`;
      if (email) {
        texto += `\n\n Email de contacto: ${email}`;
      }

      const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      window.open(link, "_blank");
      form.reset();
      showToast("A abrir o WhatsApp...", "success");
    });
  }
  
});
