document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  const form = document.getElementById('my-form');
  const msg = document.getElementById('msg');
  const fileInput = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
    } else {
      fileName.textContent = "Escolher Arquivo";
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
      msg.innerText = '❌ Por favor, anexe um arquivo antes de enviar.';
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
        fileName.textContent = "Escolher Arquivo";
      } else {
        throw new Error('Status ' + response.status);
      }
    } catch (err) {
      msg.innerText = '❌ Erro ao enviar: ' + err.message;
      msg.style.color = 'red';
    }
  });
});
