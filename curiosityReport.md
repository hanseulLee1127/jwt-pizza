# 🔍 Curiosity Report: Site Reliability Engineering (SRE)

## 📌 Why I Chose This Topic
While learning about DevOps in class, I kept seeing the term **SRE** in tech blogs and job listings. I wanted to understand how SRE relates to DevOps, and why companies like Google, Netflix, and LinkedIn invest heavily in it. This curiosity led me to research how SRE works and how it differs from traditional operations.

---

## 💡 What Is Site Reliability Engineering?

Site Reliability Engineering (SRE) is a discipline that applies **software engineering principles** to operations. The goal is to create **scalable and reliable systems** through automation, monitoring, and performance optimization.

SRE was originally developed at **Google** in the early 2000s. Instead of relying only on system administrators, they hired software engineers and gave them responsibility for reliability and uptime.

---

## 🔑 Core Principles of SRE

- **SLIs, SLOs, and Error Budgets**  
  - **SLI** (Service Level Indicator): Metric (e.g., latency, uptime) that reflects user experience.  
  - **SLO** (Service Level Objective): A target goal for an SLI (e.g., 99.9% uptime).  
  - **Error Budget**: The amount of "acceptable" downtime. If used up, no more feature releases until reliability improves.

- **Eliminating Toil**  
  Toil is repetitive, manual, and automatable work. SREs focus on reducing toil through automation.

- **Blameless Postmortems**  
  When failures happen, SREs focus on learning instead of blaming individuals.

- **Monitoring & Observability**  
  SREs rely on dashboards, alerts, and logs to detect issues early.

---

## 🛠️ Real-World Practices

Companies like **Netflix** take SRE to the next level. They even built a tool called **Chaos Monkey** that randomly disables services in production to test resilience.

At **Google**, SREs spend up to 50% of their time on engineering work (e.g., writing code to improve reliability) and 50% on operations.

---

## 🧠 What I Learned

- SRE bridges the gap between software engineering and IT operations.
- It formalizes reliability as an engineering problem.
- Automation and metrics are central to maintaining healthy systems.
- I now understand that **DevOps is the culture**, while **SRE is one way to implement it** with specific tools and metrics.