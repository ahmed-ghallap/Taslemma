import bhi47Logo from "@assets/collage1.png";
import cairo from "@assets/cairo.png";
import alex from "@assets/alex.png";
import ainShams from "@assets/ainShams.png";
import auc from "@assets/auc.png";
import mit from "@assets/mit.jpg";
import cows from "@assets/cows.jpg";

const DATE = new Date().toLocaleDateString("en-EG", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const TEMPLATES = {
  blank: {
    fullName: "صفحة فارغة",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "CLICK ME to edit",
        "SAVE ME (by Entr) or (click outside)",
        "EXPORT PDF or Image",
      ],
      logo: null,
      heading: "Start with one of our templates",
      subHeading: "⬅️ There are",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [
        { name: "Everything is editable ", studentId: "0000" },
        { name: "Everything is editable ", studentId: "0000" },
        { name: "Everything is editable ", studentId: "0000" },
      ],
      supervisors: ["Dr/ supervisor"],
    },
  },

  BHI47: {
    fullName: "المعهد العالي للهندسة والتكنولوجيا بالبحيرة",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "Ministry Of Higher Education.",
        "The Higher Institute For Engineering And Technology – Beheira.",
        "Computer Engineering Department.",
      ],
      logo: bhi47Logo,
      heading: "heading",
      subHeading: "sub heading",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  CU: {
    fullName: "جامعة القاهرة",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "Cairo University.",
        "Faculty of Engineering.",
        "Computer Engineering Department.",
      ],
      logo: cairo,
      heading: "Graduation Project",
      subHeading: "Final Year Project",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  ALEXU: {
    fullName: "جامعة الإسكندرية",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "Alexandria University.",
        "Faculty of Engineering.",
        "Computer and Systems Engineering Department.",
      ],
      logo: alex,
      heading: "Graduation Project",
      subHeading: "Final Year Project",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  ASU: {
    fullName: "جامعة عين شمس",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "Ain Shams University.",
        "Faculty of Engineering.",
        "Computer Engineering Department.",
      ],
      logo: ainShams,
      heading: "Graduation Project",
      subHeading: "Final Year Project",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  AUC: {
    fullName: "الجامعة الأمريكية بالقاهرة",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "The American University in Cairo.",
        "School of Sciences and Engineering.",
        "Department of Computer Science and Engineering.",
      ],
      logo: auc,
      heading: "Senior Project",
      subHeading: "Graduation Requirement",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  MIT: {
    fullName: "جامعة MIT",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "Massachusetts Institute of Technology.",
        "School of Engineering.",
        "Department of Electrical Engineering and Computer Science.",
      ],
      logo: mit,
      heading: "Capstone Project",
      subHeading: "Final Project",
      submittedBy: "Submitted By :",
      supervisedBy: "Supervised By :",
      date: DATE,
      dir: "ltr",
      students: [{ name: "student name", studentId: "0000" }],
      supervisors: ["Dr/ supervisor"],
    },
  },

  DLI_AR: {
    fullName: "معهد الدلتا (عربي)",
    past: [],
    future: [],
    current: {
      InstitutionHeader: [
        "وزارة التعليم العالي.",
        "معهد تنطيط المواشي – الدلتا.",
        "قسم تكنولوجيا تنطيط الأبقار المتقدمة.",
      ],
      logo: cows,
      heading: "مشروع التخرج",
      subHeading: "السنة النهائية",
      submittedBy: "مقدم من :",
      supervisedBy: "تحت إشراف :",
      date: DATE,
      dir: "rtl",
      students: [{ name: "اسم الطالب", studentId: "0000" }],
      supervisors: ["د/ المشرف"],
    },
  },
};

export { TEMPLATES };
