# GCE-KOREA

![gce-korea](https://user-images.githubusercontent.com/37402072/129680104-e6a45504-b7fa-49d3-afdc-d4d29793f2fb.png)

## 📍 Welcome
### 안녕하세요! 👋🏼. 

This website is dedicated to "GitHub Campus Expert - Korea". 

I created it during learning React. 

I hope you'll like it.

## 📝 Prerequisites
- node
```bash
node -v
v12.22.5
```
- npm
```bash
npm -v
7.5.2
```
- git
```bash
git --version
git version 2.30.2
```

## 💡 How to run

### 1. Clone the repo
```bash
git clone https://github.com/sky9262/gce-korea
cd gce-korea
```

### 2. Install all dependencies
```bash
npm i
```

### 3. Run the React App
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

### 3. Add environment variable / secrets [(How to add)](https://stackoverflow.com/questions/57685065/how-to-set-secrets-in-github-actions#:~:text=left%20hand%20menu-,Add%20a%20new%20secret,-and%20provide%20a)
Add api url as a environment variable named `REACT_APP_API`

In my case,
```
REACT_APP_API = <The api url>
```
Note: Don't add `/` at the end of the api url.

### 4. Now deploy
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


