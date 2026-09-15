# Sudhanshu Labs

<div align="center">

<img src="https://raw.githubusercontent.com/Sudhanshuraj1037/Portfolio/main/src/assets/sudhanshu.jpg" width="120" alt="Sudhanshu Raj" />

# Sudhanshu Raj

### AI Systems Engineer · Applied ML · Computer Vision · Full-Stack Engineering

I build practical AI systems that connect machine learning models,
software engineering, and real-world user problems.

<br />

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-111827?style=for-the-badge)](https://sudhanshuraj1037.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Sudhanshuraj1037-111827?style=for-the-badge&logo=github)](https://github.com/Sudhanshuraj1037)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sudhanshu%20Raj-111827?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sudhanshuraj1037)

</div>

---

## ⚡ Hero

> **From models to systems.**
>
> I am a Computer Science undergraduate focused on Applied AI, Machine Learning,
> Computer Vision, and software engineering.
>
> My work focuses on turning individual models into usable systems — combining
> perception, decision-making, application logic, and user interaction.

**Current focus**

`Applied AI` · `Machine Learning` · `Computer Vision` · `Python` · `System Design`

**Flagship system**

[Blind Assistant](https://github.com/Sudhanshuraj1037/Blind-AI) — an AI-powered
assistive vision system combining multiple computer vision capabilities with
voice-based feedback.

---

## 🧠 What I Build

I am interested in engineering AI systems rather than treating machine learning
as an isolated model.

### Applied AI

Designing practical AI workflows around real-world problems, data, models,
evaluation, and user interaction.

### Computer Vision

Working with object detection, image processing, OCR, facial analysis,
and real-time visual pipelines.

### Machine Learning

Working across preprocessing, feature engineering, classification, regression,
clustering, model evaluation, and hyperparameter tuning.

### Full-Stack Engineering

Connecting AI pipelines with application layers, interfaces, APIs,
and production-oriented software workflows.

---

## 🚀 Featured Project

### Blind Assistant

[![Repository](https://img.shields.io/badge/GitHub-Blind--AI-111827?style=flat-square&logo=github)](https://github.com/Sudhanshuraj1037/Blind-AI)

An AI-powered assistive vision system designed to help visually impaired users
interpret visual information through computer vision and voice feedback.

**Capabilities include:**

- Object detection
- OCR
- Face and emotion recognition
- Currency detection
- Voice-based feedback
- Real-time computer vision processing

**Engineering focus**

The system explores how multiple perception modules can work together through
a coordinated processing pipeline instead of operating as isolated demos.

**Core technologies**

`Python` `OpenCV` `YOLO` `TensorFlow`

---

## 🛠️ Technology Stack

### Languages

![Python](https://img.shields.io/badge/Python-111827?style=flat-square&logo=python)
![C](https://img.shields.io/badge/C-111827?style=flat-square&logo=c)
![C++](https://img.shields.io/badge/C%2B%2B-111827?style=flat-square&logo=cplusplus)
![Java](https://img.shields.io/badge/Java-111827?style=flat-square&logo=openjdk)

### AI / ML / Computer Vision

![TensorFlow](https://img.shields.io/badge/TensorFlow-111827?style=flat-square&logo=tensorflow)
![OpenCV](https://img.shields.io/badge/OpenCV-111827?style=flat-square&logo=opencv)
![YOLO](https://img.shields.io/badge/YOLO-111827?style=flat-square)
![Pandas](https://img.shields.io/badge/Pandas-111827?style=flat-square&logo=pandas)
![NumPy](https://img.shields.io/badge/NumPy-111827?style=flat-square&logo=numpy)
![Matplotlib](https://img.shields.io/badge/Matplotlib-111827?style=flat-square&logo=matplotlib)
![DeepFace](https://img.shields.io/badge/DeepFace-111827?style=flat-square)

### Application / Web

![Flask](https://img.shields.io/badge/Flask-111827?style=flat-square&logo=flask)
![React](https://img.shields.io/badge/React-111827?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-111827?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-111827?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-111827?style=flat-square&logo=tailwindcss)

### Engineering & Platforms

`Git` · `GitHub` · `Docker` · `MySQL` · `AWS` · `Google Colab`
· `Jupyter Notebook` · `VS Code` · `Tableau`

---

## 🔬 Engineering Approach

I try to approach projects as systems rather than collections of technologies.

### 01 — Understand the problem

Identify the user, constraints, inputs, outputs, and the actual problem being solved.

### 02 — Build the pipeline

Connect preprocessing, models, business logic, and application components into
a coherent workflow.

### 03 — Evaluate

Use appropriate evaluation techniques rather than relying on a single metric.

### 04 — Iterate

Test edge cases, identify bottlenecks, and improve the system based on observed
behavior.

### 05 — Ship

Turn the working prototype into something structured, maintainable, and usable.

---

## 🧩 Engineering Principles

### No fabricated content

No placeholder metrics, fake demo links, invented users, or fictional project
results.

If real data does not exist, it is not presented as real.

### Honest capability labeling

Technologies are used based on actual exposure and implementation.
Learning something does not automatically mean claiming expertise.

### Engineering over decoration

Visual design should communicate the system, not hide it.

### Motion with purpose

Animations exist to support hierarchy, feedback, or system visualization.
Reduced-motion preferences are respected.

### Real systems over project lists

The portfolio focuses on how systems work, why engineering decisions were made,
and what was learned from implementation.

---

## 🏗️ Portfolio Architecture

The portfolio itself is built as a React + TypeScript application with a
component-driven architecture.

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── LoadingScreen
│   │   └── MobileNav
│   │
│   ├── sections/
│   │   ├── Hero
│   │   ├── WhatIBuild
│   │   ├── FeaturedProject
│   │   ├── About
│   │   ├── Skills
│   │   ├── Projects
│   │   ├── GitHub
│   │   └── Contact
│   │
│   │   ├── architecture/
│   │   │   ├── ArchitectureDiagram
│   │   │   ├── MobileArchitectureDiagram
│   │   │   └── ArchitectureFullscreenModal
│   │   │
│   │   └── featured-project/
│   │       └── case-study components
│   │
│   ├── three/
│   │   ├── NeuralNetworkCanvas
│   │   └── CanvasErrorBoundary
│   │
│   └── ui/
│       ├── FadeIn
│       └── shared primitives
│
├── hooks/
│   ├── usePrefersReducedMotion
│   ├── useActiveSection
│   ├── useReasoningTrace
│   └── useModalBehavior
│
├── lib/
│   ├── navigation
│   ├── profile
│   └── utils
│
└── styles/
    └── tokens.css
