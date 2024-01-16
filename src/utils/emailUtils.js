/* eslint-disable max-len, max-lines-per-function */
const getResetPasswordEmail = (user, token) => {
    const url = `${process.env.FRONTEND_URL}/nova-senha?token=${token}`;
  
    return {
      from: 'Serviços cadMerenda',
      to: user.email,
      subject: 'Redefinir sua senha do cadMerenda',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Redefinição de Senha</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif;
      color: #2c3e50;">
        <div
          style="
            background-color: white;
            border: #ced4da;
            border-style: solid;
            border-width: 1px;
            border-radius: 20px;
            padding: 20px 30px;
            max-width: 600px;
            margin: 0 auto;
            margin-top: 5rem;
          "
        >
          <h2>Olá, ${user.name}!</h2>
          <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
          <p>Clique <a href="${url}">aqui</a> para alterar sua senha.</p>
          <p>Ou copie e cole o link abaixo em seu navegador:</p>
          <p>${url}</p>
          <p>Se você não solicitou a redefinição de senha, pode ignorar este e-mail.</p>
          <p>Esse link expira em 1 hora.</p>
          <p style="font-size: small; color: #95a5a6">
            Caso o link não funcione, copie e cole o texto a seguir e cole na barra
            de endereço do seu navegador:
          </p>
          <p style="font-size: small; color: #95a5a6;">${url}</p>
          <div style="border: 0; border-top: 1px; border-style: solid; border-color: #ced4da;"></div>
          <p style="font-size: small; font-weight: bold;">INSTRUÇÕES PARA REDEFINIÇÃO:</p>
          <ol style="font-size: small;">
            <li>Clique no botão acima ou copie e cole o link em seu navegador.</li>
            <li>Digite sua nova senha</li>
            <li>Confirme sua nova senha</li>
            <li>Clique em "ENVIAR".</li>
            <li>
              Pronto! Sua senha foi alterada. Você já pode acessar o cadMerenda
              normalmente.
            </li>
          </ol>
        </div>
        <div style="margin: 0 auto; margin-top: 50px; max-width: 600px; text-align: center;">
            <p style="color: #95a5a6; font-size: small; font-weight: light;">Não responda a este e-mail.</p>
            <p style="color: #95a5a6; font-weight: bold;">Secretaria de Estado da Educação de Alagoas</p>
            <p style="color: #95a5a6;">suporte-cadmerenda@educ.al.gov.br</p>
            <h2 style="color: #005da8;">
              cad<span style="color: #ff9842">Merenda</span>
            </h2>
        </div>
      </body>
      </html>`,
    };
  };
  
  module.exports = { getResetPasswordEmail };