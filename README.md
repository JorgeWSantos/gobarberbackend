# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- O link  enviado por email para resetar senha, deve expirar em 2hrs;
- O usuário precisa confirmar a nova senha ao confirmar sua senha;

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar por um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia  devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas  no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve tyer um status de lida ou não lida para que o prestador possa controlar;


# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia  especifíco de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores devem ser armazenadas em cache;

**RN**

- Cada agendamento deve durar 1 hr exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h(Primeiro ás 8h, último 18h)
- O usuário não pode agendar num horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;


# Info

**RF - Requisitos Funcionais**

**RNF - Requisitos Não Funcionais**

**RN - Regras de Negócio**


