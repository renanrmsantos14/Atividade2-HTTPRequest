const input = document.getElementById("search-input");
const result = document.getElementById("result");
const btn = document.getElementById('searchBtn');

function showResult(message, type) {
  result.innerHTML = message; // textContent → innerHTML
  result.className = `result ${type}`;
}

async function handleCepSearch() {
  const rawCep = input.value.replace(/\D/g, "");
  if (rawCep.length !== 8) {
    showResult("CEP inválido. O CEP deve conter 8 dígitos.", "error");
    return;
  } else {
    showResult("Buscando informações do CEP...", "loading");
    const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
    if (!response.ok) {
      showResult("Erro ao buscar o CEP. Tente novamente mais tarde.", "error");
    } else {
      const data = await response.json();
      if (data.erro) {
        showResult(
          "CEP não encontrado. Verifique o número e tente novamente.",
          "error",
        );
      } else {
        const message = `<p><strong>CEP:</strong> ${data.cep || "-"}</p>
        <p><strong>Logradouro:</strong> ${data.logradouro || "-"}</p>
        <p><strong>Bairro:</strong> ${data.bairro || "-"}</p>
        <p><strong>Cidade:</strong> ${data.localidade || "-"}</p>
        <p><strong>UF:</strong> ${data.uf || "-"}</p>`;
        showResult(message, "success");
      }
    }
  }
}

// teste de mudançasssssses

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleCepSearch();
  }
});

input.addEventListener("input", function () {
  if (input.value.trim().length !== 8) {
    result.innerHTML = "";
    result.className = "result";
  }
});


btn.addEventListener("click", handleCepSearch);



/* efeito magnético + ring de clique */


btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width/2))  / (r.width/2);
  const dy = (e.clientY - (r.top  + r.height/2)) / (r.height/2);
  btn.style.transform = `rotateY(${dx*14}deg) rotateX(${-dy*14}deg)`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'rotateY(0deg) rotateX(0deg)';
});
btn.addEventListener('click', () => {
  btn.classList.remove('clicked');
  void btn.offsetWidth;          // força reflow para resetar animação
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 600);
});