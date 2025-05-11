document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  const form = document.getElementById('my-form');
  const msg = document.getElementById('msg');
  const fileInput = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');
  const proofInput = document.getElementById('proof-input');
  const proofName = document.getElementById('proof-name');
  const copyButton = document.getElementById('copy-cnpj');

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = "Escolher Arquivo";
    }
  });

  proofInput.addEventListener('change', () => {
    if (proofInput.files.length > 0) {
      proofName.textContent = proofInput.files[0].name;
    } else {
      proofName.textContent = "Escolher Comprovante";
    }
  });


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!fileInput.files.length || !proofInput.files.length) {
      msg.innerText = '❌ Por favor, anexe todos os arquivos antes de enviar.';
      msg.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('/api/enviar-formulario', {
        method: 'POST',
        body: new FormData(form)
      });

      if (response.ok) {
        msg.innerText = '✅ Inscrição enviada com sucesso!';
        msg.style.color = 'green';
        form.reset();
        fileName.textContent = "Escolher Formulário";
        proofName.textContent = "Escolher Comprovante";
      } else {
        if (response.status === 413) {
          msg.innerText = '❌ Os arquivos são muito grandes! Envie arquivos menores que 4MB.';
        } else {
          throw new Error('Status ' + response.status);
        }
        msg.style.color = 'red';
      }
    } catch (err) {
      msg.innerText = '❌ Erro ao enviar: ' + err.message;
      msg.style.color = 'red';
    }
  });

  if (copyButton) {
    copyButton.addEventListener('click', () => {
      const cnpj = '01.615.265/0001-67';
      navigator.clipboard.writeText(cnpj)
        .then(() => {
          copyButton.innerText = '✅ Pix CNPJ Copiado!';
          setTimeout(() => {
            copyButton.innerText = '📋 Copiar pix CNPJ: 01.615.265/0001-67';
          }, 2000);
        })
        .catch(() => {
          alert('Erro ao copiar o CNPJ. Copie manualmente.');
        });
    });
  }
});
