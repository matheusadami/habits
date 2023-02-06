# Habits
### Sistema de Controle de Hábitos desenvolvido durante o evento NLW Setup da Rocketseat.

![Wallpaper](https://user-images.githubusercontent.com/59755164/213929698-7a201292-0923-4057-8725-3096495c145d.png)

## Como executar?

### Configurar Firebase Auth
Utilizamos o Firebase Authentication para controle dos usuários autenticados e cadastrados no Habits.
Para configurar o Firebase Authentication, você pode seguir [este tutorial da própria equipe do Firebase](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize) e, após isso, colocar as configurações ```firebaseConfig``` referente ao app criado no arquivo ``webapp/.env.example`` e, depois, o renomear de ``.env.example`` para ``.env``.

### API (Back-end)
```sh
cd server
npx prisma migrate dev --name create tables
npm run dev
```

### Web App (Front-end)
```sh
cd webapp
npm run dev
```

Após execução desses comandos, o sistema estará disponível no endereço: http://127.0.0.1:5173

---
