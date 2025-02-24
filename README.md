# Fillet.JS - Official Documentation

Fillet.JS is a front-end application generator that leverages a modular architecture based on React and Redux Toolkit, simplifying the development of scalable and well-structured projects. It automates the creation of components, features, containers, views, and layouts, following organizational patterns that promote code reusability and separation of concerns.

With simple commands, FilletJS enables quick project setup, centralized state management, and seamless integration with external APIs. Its layered structure — Layouts, Views, Features, Containers, and Components — ensures smooth communication between different parts of the system, enhancing readability and maintainability.

## **Architecture**
![Arquitetura FilletJS](src/images/arquitetura.png)

## 📥 Installation

### **Using Yarn**
```bash
yarn global add filletjs
```

### **Using NPM**
```bash
npm install filletjs -g
```

---

## 🚀 Usage

### **Create a New Application**

Run the command to generate a new application:

```bash
fillet new my-app
```

or using **NPX**:

```bash
npx filletjs new my-app
```

### **Run the Project**

After installation, navigate to the project directory:

```bash
cd my-app
```

Start the project in development mode:

```bash
yarn start
```

or

```bash
npm start
```

Open your browser and access: [http://localhost:4000](http://localhost:4000)

---

## 🏗️ Build

### **Production**

Build the project for production:

```bash
yarn build
```

or

```bash
npm run build
```

### **Staging (UAT)**

Build the project for staging environment:

```bash
yarn build:uat
```

or

```bash
npm run build:uat
```

---

## 🧱 Project Architecture

FilletJS is designed with a modular architecture to scale projects efficiently. The structure consists of five main layers that communicate in an organized manner:

### 📂 **1. Layouts**
- **Responsibility:** Define the basic structure of the project, such as master pages.
- **Usage:** Manage the `Outlet` for rendering **Views**.

**Generate a layout:**
```bash
fillet g layout <your-layout>
```
**Example:**
```bash
fillet g layout logged
```

---

### 🗺️ **2. Views**
- **Responsibility:** Map routes to specific pages.
- **Function:** Connect URLs to what will be displayed on the screen.

**Generate a view:**
```bash
fillet g view <your-area>/<page>
```
**Examples:**
```bash
fillet g view account
fillet g view account/management
```

---

### 💡 **3. Features**
- **Responsibility:** Implement business logic and integrate with external APIs.
- **State Management:** Use **Redux Toolkit** for centralized state management.

**Generate a feature:**
```bash
fillet g feature <your-feature>
```
**Example:**
```bash
fillet g feature account
```

---

### 📊 **4. Containers**
- **Responsibility:** Act as a bridge between **Features** and **Views**, connecting data and business logic.
- **Function:** Handle and display data from **Features**.

**Generate a container:**
```bash
fillet g container <your-feature>/<context>
```
**Example:**
```bash
fillet g container account/list
```

---

### 📦 **5. Components**
- **Responsibility:** Reusable elements of the **Design System**.
- **Rule:** Should not contain business logic or make external calls.

**Generate a component:**
```bash
fillet g component <your-component>/<variation>
```
**Examples:**
```bash
fillet g component menu
fillet g component menu/item
```

---

## 🧭 Data Flow

1. **User interacts** with **Components** inside a **View**.
2. The **View** passes events to the **Container**, which handles display logic.
3. The **Container** fetches or updates data in **Features**.
4. **Features** make API calls via **Services** or access the **Redux Store**.
5. The updated state flows back to **Containers** and **Views**.

---

## 📊 Best Practices

- ✅ **Components** should be pure and UI-focused.
- ✅ **Features** manage complex data and business logic.
- ✅ **Containers** orchestrate communication between Views and Features.
- ❌ **Avoid** direct coupling between Components and Features.

---

## 🌐 Useful Links

- 💻 [Official Website](https://fillet.com.br/)

> **2024 • FilletJS** — CREATE • EXPLORE • IMPROVE

