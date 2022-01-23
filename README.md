# GCE-KOREA

![gce-korea](https://user-images.githubusercontent.com/37402072/129680104-e6a45504-b7fa-49d3-afdc-d4d29793f2fb.png)

## 📍 Welcome
### 안녕하세요! 👋🏼. 

This website is dedicated to "GitHub Campus Expert - Korea". 

I created it during learning React. 

I hope you'll like it.

## 💡 How to run

### 1. Install all dependencies
```bash
npm i
```

### 2. Run the React App
```bash
npm start
```

## 🔌 How to deploy to Github Pages

### 1. Add homepage to `package.json` file
```diff
{
  "name": "gce-korea",
  "version": "0.1.0",
+ "homepage": "https://<username>.github.io/<repo name>",
  "private": true,
```
In my case:
```diff
{
  "name": "gce-korea",
  "version": "0.1.0",
+ "homepage": "https://sky9262.github.io/gce-korea",
  "private": true,
```

### 2. Add a "remote" to the local Git repository
```bash
git remote add origin https://github.com/{username}/{repo-name}.git
```
In my case:
```bash
git remote add origin https://github.com/sky9262/gce-korea.git
```

### 3. Now deploy
```bash
npm deploy
```

## 🥣 What I used

- This project is created using **MERN** (MongoDB, Express, React and Node.js) stack.

- Frontend using **React Js**.

- Backend using **Express and Node Js**.

- Database using **MongoDB**.

## 🔒 Authentication

- Sign in using **JWT**.

- Sign up only by admin ( using a **secret key** ).

- Password encrypted with **sha256 encryption**.


## 🔗 Connect with me
[![blog](https://img.shields.io/badge/blog-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://sky9262.tistory.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sky9262/)
[![github](https://img.shields.io/badge/github-1DA1F2?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sky9262/)


