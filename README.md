# 📘 StudyApp AZ900

**StudyApp AZ900** is an interactive application to prepare for the **Microsoft Azure Fundamentals (AZ-900)** exam.  
It allows you to practice with **485 questions** in different study modes to reinforce your Azure knowledge in a fun and structured way.

---

## 📂 Source of the Questions

The questions were taken from the following public repository:  
[Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Practice-Tests-Exams-Questions-Answers](https://github.com/Ditectrev/Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Practice-Tests-Exams-Questions-Answers)

They were then converted into a **structured JSON file** using **ChatGPT 4o** with **Agent Mode**.

---

## 🎮 Application Modes

The app includes **4 study modes**:

1. **📑 Exam Mode**
   - 36 random questions per attempt  
   - Question counter and final score with percentage  
   - Review of answers after completing the exam  

2. **📝 Practice Mode**
   - Access to all **485 questions**  
   - You can view the **correct answer** for each question  

3. **💡 Flashcard Mode**
   - Study concept by concept  
   - Ideal for **quick review and memorization**  

4. **📊 History**
   - Saves your simulated exams in **localStorage**  
   - Allows reviewing past attempts offline  

---

## 🚀 Installation and Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/studyapp-az900.git
   cd studyapp-az900
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open in the browser**
   ```
   http://localhost:5173
   ```

---

## 📘 JSON Question Example

```json
{
  "Numero": 1,
  "Pregunta": "If you plan to host a web application in the Azure platform as a service solution of Azure Web Apps, then the platform will have the ability to scale automatically?",
  "Opciones": ["Yes.", "No."],
  "Respuesta": "Yes."
}
```

---

## ⚠️ Note

This app was generated with **ChatGPT 4o** and, although it works correctly in testing, **it may contain minor bugs**.  
It is always recommended to verify answers with the official **Microsoft Learn** documentation.
